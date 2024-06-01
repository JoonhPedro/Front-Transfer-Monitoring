import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { useRef, useState } from 'react'
import { api } from '../../services/api'
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
  status: string
  created_at: string
  updated_at: string
}

export function NewTransactionsModal() {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([])
  const nameRef = useRef<HTMLInputElement | null>(null)
  const categoriaRef = useRef<HTMLInputElement | null>(null)
  const precoRef = useRef<HTMLInputElement | null>(null)
  const metodoRef = useRef<HTMLSelectElement | null>(null)
  const [status, setStatus] = useState<string>('income')

  async function handleSubmit() {
    if (
      !nameRef.current?.value ||
      !categoriaRef.current?.value ||
      !precoRef.current?.value ||
      !metodoRef.current?.value
    )
      return

    try {
      const response = await api.post('/transactions', {
        name: nameRef.current.value,
        categoria: categoriaRef.current.value,
        preco: precoRef.current.value,
        metodo: metodoRef.current.value,
        status,
      })
      setTransactions([...transactions, response.data])
    } catch (err) {
      console.error('Failed to create transaction:', err)
    }
  }

  function handleStatusChange(selectedStatus: string) {
    setStatus(selectedStatus)
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title> Nova Transação</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Descrição" required ref={nameRef} />
          <input type="number" placeholder="Preço" required ref={precoRef} />
          <input
            type="text"
            placeholder="Categoria"
            required
            ref={categoriaRef}
          />
          <Select ref={metodoRef} defaultValue="" required>
            <option value="" disabled>
              Selecione um método
            </option>
            <option value="PIX">PIX</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartao de credito">Cartão de crédito</option>
          </Select>
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
        </form>
      </Content>
    </Dialog.Portal>
  )
}
