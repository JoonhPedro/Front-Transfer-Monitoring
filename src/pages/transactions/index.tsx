import { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { formatPrice } from '../../format/price'
import { api } from '../../services/api'
import { SearchForm } from './components/SerchForm'
import {
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
} from './style'

interface TransactionsProps {
  id: string
  name: string
  categoria: string
  preco: string
  metodo: string
  status: 'income' | 'outcome'
  created_at: string
  updated_at: string
}

export function Transactions() {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([])
  const [filteredTransactions, setFilteredTransactions] = useState<
    TransactionsProps[]
  >([])
  const [selectedStatus, setSelectedStatus] = useState<
    'income' | 'outcome' | (() => 'income' | 'outcome')
  >()

  useEffect(() => {
    loadTransactions()
  }, [])

  async function loadTransactions() {
    try {
      const response = await api.get('/transactions')
      setTransactions(response.data)
      setFilteredTransactions(response.data)
    } catch (err) {
      console.error((err as Error).message)
    }
  }

  const handleSearch = (searchTerm: string) => {
    const filtered = transactions.filter(
      (transaction) =>
        transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!selectedStatus || transaction.status === selectedStatus),
    )
    setFilteredTransactions(filtered)
  }

  const handleSelectedStatusChange = (status: string) => {
    setSelectedStatus(
      status as 'income' | 'outcome' | (() => 'income' | 'outcome'),
    )
  }

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm
          onSearch={handleSearch}
          setSelectedStatus={handleSelectedStatusChange}
        />
        <TransactionsTable>
          <tbody>
            {transactions.length > 0 ? (
              <>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td width="30%">{transaction.name}</td>
                    <td>{transaction.metodo}</td>
                    <td>
                      <PriceHighLight
                        variant={transaction.status || (() => selectedStatus)}
                      >
                        R$ {transaction.status === 'outcome' ? '- ' : ''}
                        {formatPrice(parseFloat(transaction.preco))}{' '}
                      </PriceHighLight>
                    </td>
                    <td>
                      <p>{transaction.categoria}</p>
                    </td>
                    <td width="10%">
                      {new Intl.DateTimeFormat('pt-BR').format(
                        new Date(transaction.created_at),
                      )}
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <>
                <h1>Sem transacoes</h1>
              </>
            )}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
