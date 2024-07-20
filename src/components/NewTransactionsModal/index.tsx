import { Checkbox, Link, Spinner, useToast } from '@chakra-ui/react'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { useRef, useState } from 'react'
import { api } from '../../services/api'
import { NewTermUser } from '../NewTermUser'
import {
  CloseButton,
  Content,
  Overlay,
  Select,
  TransactionType,
  TransactionTypeButton,
} from './styles'

interface TransactionsProps {
  id: string
  name: string
  categoria: string
  preco: string
  metodo: string
  status: string
  created_at: string
  updated_at: string
}

export function NewTransactionsModal() {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([])
  const nameRef = useRef<HTMLInputElement | null>(null)
  const categoriaRef = useRef<HTMLInputElement | null>(null)
  const precoRef = useRef<HTMLInputElement | null>(null)
  const fileRef = useRef<HTMLInputElement | null>(null)
  const metodoRef = useRef<HTMLSelectElement | null>(null)
  const [status, setStatus] = useState<string>('income')
  const [loading, setLoading] = useState(false)
  const [showOtherInput, setShowOtherInput] = useState(false)
  const toast = useToast()

  const { error } = console
  // adicionar erros na api
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (
      !nameRef.current?.value ||
      !categoriaRef.current?.value ||
      !precoRef.current?.value ||
      !metodoRef.current?.value
    )
      return

    try {
      setLoading(true)
      const response = await api.post('/transactions', {
        name: nameRef.current.value,
        categoria: categoriaRef.current.value,
        preco: precoRef.current.value,
        metodo: metodoRef.current.value,
        file: fileRef.current?.value,
        status,
      })
      setTransactions([...transactions, response.data])
      toast({
        title: 'Transação Realizada com Sucesso.',
        status: 'success',
        duration: 1500,
        isClosable: true,
        position: 'top-right',
      })
    } catch (err) {
      toast({
        title: 'Erro.',
        description: 'Ocorreu um erro ao tentar cadastrar a transação.',
        status: 'error',
        duration: 1500,
        isClosable: true,
        position: 'top-right',
      })
      error('Failed to create transaction:', err)
    } finally {
      setLoading(false)
    }
    location.reload()
  }

  function handleStatusChange(selectedStatus: string) {
    setStatus(selectedStatus)
  }

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedValue = e.target.value
    if (selectedValue === 'text') {
      setShowOtherInput(true)
    } else {
      setShowOtherInput(false)
    }
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title> Nova Transação </Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        {loading ? (
          <>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </>
        ) : (
          <>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Descrição"
                required
                ref={nameRef}
              />
              <input
                type="number"
                placeholder="Preço"
                required
                ref={precoRef}
              />
              <input
                type="text"
                placeholder="Categoria"
                required
                ref={categoriaRef}
              />
              <input type="text" placeholder="Observações" ref={fileRef} />
              <Select
                ref={metodoRef}
                defaultValue=""
                required
                onChange={handleSelectChange}
              >
                <option value="" disabled>
                  Selecione um método
                </option>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Pix">PIX</option>
                <option value="Cartao de credito">Cartão de crédito</option>
                <option value="Cartão Debito">Cartão Debito</option>
                <option value="text">Outros</option>
              </Select>
              {showOtherInput && (
                <input type="text" placeholder="Digite aqui outro método" />
              )}
              <TransactionType>
                <TransactionTypeButton
                  variant="income"
                  value="income"
                  onClick={() => handleStatusChange('income')}
                >
                  <ArrowCircleUp size={24} />
                  Entrada
                </TransactionTypeButton>
                <TransactionTypeButton
                  variant="outcome"
                  value="outcome"
                  onClick={() => handleStatusChange('outcome')}
                >
                  <ArrowCircleDown size={24} />
                  Saída
                </TransactionTypeButton>
              </TransactionType>
              <button type="submit">Cadastrar</button>
              <Checkbox required>
                <p>Li e estou de acordo com a Política de Privacidade</p>
              </Checkbox>
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <Link>Política de Privacidade</Link>
                </Dialog.Trigger>
                <NewTermUser />
              </Dialog.Root>
            </form>
          </>
        )}
      </Content>
    </Dialog.Portal>
  )
}
