import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'
import { SummaryCard, SummaryContainer } from './styles'
import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import { formatPrice } from '../../format/price'

interface TransactionsProps {
  id: string
  name: string
  categoria: string
  preco: string
  status: string
  created_at: string
  updated_at: string
}

export function Summary() {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([])

  useEffect(() => {
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

  function calculateEntradas(): number {
    return transactions
      .filter((transaction) => transaction.status === 'income')
      .reduce((total, transaction) => total + parseFloat(transaction.preco), 0)
  }

  function calculateSaidas(): number {
    return (
      transactions
        .filter((transaction) => transaction.status === 'outcome')
        .reduce(
          (total, transaction) => total + parseFloat(transaction.preco),
          0,
        ) * -1
    )
  }

  const entrada = calculateEntradas()
  const saida = calculateSaidas()
  const total = entrada + saida

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>
        <strong> R$ {formatPrice(entrada)}</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>
        <strong>R$ {formatPrice(saida)}</strong>
      </SummaryCard>
      <SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>
        <strong>R$ {formatPrice(total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}
