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

  function calculateInputs(): number {
    return transactions
      .filter((transaction) => transaction.status === 'income')
      .reduce((total, transaction) => total + parseFloat(transaction.preco), 0)
  }

  function calculateOutputs(): number {
    return transactions
      .filter((transaction) => transaction.status === 'outcome')
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
