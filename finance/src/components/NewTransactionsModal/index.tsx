import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles'
import { useRef, useState } from 'react'
import { api } from '../../services/api'

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
  const [status, setStatus] = useState<string>('income')
  async function handleSubmit() {
    if (
      !nameRef.current?.value ||
      !categoriaRef.current?.value ||
      !precoRef.current?.value
    )
      return
    try {
      const response = await api.post('/transactions', {
        name: nameRef.current?.value,
        categoria: categoriaRef.current?.value,
        preco: precoRef.current?.value,
        status,
      })
      setTransactions([...transactions, response.data])
    } catch (err) {
      return err
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
