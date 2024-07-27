import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { formatPrice } from '../../format/price'
import { api } from '../../services/api'
import { SummaryCard, SummaryContainer } from './styles'

interface TransactionsProps {
  id: string
  name: string
  categoria: string
  preco: string
  status: string
  created_at: string
  updated_at: string
  userId: string
}

export function Summary() {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([])
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    loadUserId()
    loadTransactions()
  }, [])

  async function loadTransactions() {
    try {
      const response = await api.get('/transactions')
      setTransactions(response.data)
    } catch (err) {
      console.error((err as Error).message)
    }
  }

  function loadUserId() {
    const userJson = localStorage.getItem('user')
    if (userJson) {
      try {
        const user = JSON.parse(userJson)
        setUserId(user.id)
      } catch (error) {
        console.error('Erro ao porcurar transactions do usuário:', error)
      }
    }
  }
  function calculateInputs(): number {
    if (!userId) return 0

    return transactions
      .filter(
        (transaction) =>
          transaction.status === 'income' && transaction.userId === userId,
      )
      .reduce((total, transaction) => total + parseFloat(transaction.preco), 0)
  }

  function calculateOutputs(): number {
    if (!userId) return 0

    return transactions
      .filter(
        (transaction) =>
          transaction.status === 'outcome' && transaction.userId === userId,
      )
      .reduce((total, transaction) => total + parseFloat(transaction.preco), 0)
  }

  const input = calculateInputs()
  const output = calculateOutputs()
  const total = input - output

  function getVariant(): 'green' | 'red' {
    return total >= 0 ? 'green' : 'red'
  }

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>
        <strong>R$ {formatPrice(input)}</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>
        <strong>R$ {formatPrice(output)}</strong>
      </SummaryCard>
      <SummaryCard variant={getVariant()}>
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>
        <strong>R$ {formatPrice(total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}
