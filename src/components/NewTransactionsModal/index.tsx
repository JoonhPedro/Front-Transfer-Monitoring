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

export function NewTransactionsModal() {
  const nameRef = useRef<HTMLInputElement | null>(null)
  const categoriaRef = useRef<HTMLInputElement | null>(null)
  const precoRef = useRef<HTMLInputElement | null>(null)
  const observationsRef = useRef<HTMLInputElement | null>(null)
  const metodoRef = useRef<HTMLSelectElement | null>(null)
  const [status, setStatus] = useState<string>('income')
  const [loading, setLoading] = useState(false)
  const [showOtherInput, setShowOtherInput] = useState(false)
  const toast = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const name = nameRef.current?.value
    const categoria = categoriaRef.current?.value
    const preco = precoRef.current?.value
    const metodo = metodoRef.current?.value
    const observations = observationsRef.current?.value

    if (!name || !categoria || !preco || !metodo) {
      toast({
        title: 'Erro.',
        description: 'Todos os campos obrigatórios devem ser preenchidos.',
        status: 'error',
        duration: 1500,
        isClosable: true,
        position: 'top-right',
      })
      return
    }

    const userJson = localStorage.getItem('user')
    let userId: string | null = null

    if (userJson) {
      try {
        const user = JSON.parse(userJson)
        userId = user.id
      } catch (error) {
        console.error('Erro ao analisar o JSON do usuário:', error)
        toast({
          title: 'Erro.',
          description: 'Erro ao processar dados do usuário.',
          status: 'error',
          duration: 1500,
          isClosable: true,
          position: 'top-right',
        })
        return
      }
    }

    if (!userId) {
      toast({
        title: 'Erro.',
        description: 'Usuário não está autenticado.',
        status: 'error',
        duration: 1500,
        isClosable: true,
        position: 'top-right',
      })
      return
    }

    try {
      setLoading(true)
      await api.post('/transactions', {
        name,
        categoria,
        preco,
        metodo,
        observations,
        status,
        userId,
      })

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
      console.error('Failed to create transaction:', err)
    } finally {
      setLoading(false)
    }
  }

  function handleStatusChange(selectedStatus: string) {
    setStatus(selectedStatus)
  }

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setShowOtherInput(e.target.value === 'text')
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
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : (
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Descrição" required ref={nameRef} />
            <input type="number" placeholder="Preço" required ref={precoRef} />
            <input
              type="text"
              placeholder="Categoria"
              required
              ref={categoriaRef}
            />
            <input
              type="text"
              placeholder="Observações"
              ref={observationsRef}
            />
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
              <option value="Cartão Debito">Cartão Débito</option>
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
        )}
      </Content>
    </Dialog.Portal>
  )
}
