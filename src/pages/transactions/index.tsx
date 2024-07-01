import { useEffect, useState } from 'react'
import {
  Avatar,
  Spinner,
  Table,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  WrapItem,
} from '@chakra-ui/react'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { formatPrice } from '../../format/price'
import { api } from '../../services/api'
import { SearchForm } from './components/SerchForm'
import {
  NoData,
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
  file: string
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
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadTransactions()
  }, [])

  async function loadTransactions() {
    try {
      setLoading(true)
      const response = await api.get('/transactions')
      setTransactions(response.data)
      setFilteredTransactions(response.data)
    } catch (err) {
      console.error((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (searchTerm: string) => {
    try {
      setLoading(true)
      const filtered = transactions.filter(
        (transaction) =>
          transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (!selectedStatus || transaction.status === selectedStatus),
      )
      setFilteredTransactions(filtered)
    } catch (err) {
      return (err as Error).message
    } finally {
      setLoading(false)
    }
  }

  const handleSelectedStatusChange = (status: string) => {
    try {
      setLoading(true)
      setSelectedStatus(
        status as 'income' | 'outcome' | (() => 'income' | 'outcome'),
      )
    } catch (err) {
      return (err as Error).message
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm
          onSearch={handleSearch}
          setSelectedStatus={handleSelectedStatusChange}
          loading={loading}
        />
        <TransactionsTable>
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
            <Table variant={'gray'}>
              <>
                {transactions.length > 0 ? (
                  <>
                    <Thead>
                      <Tr>
                        <Th>Tranferencia</Th>
                        <Th>Metodo</Th>
                        <Th>Preço</Th>
                        <Th>Status</Th>
                        <Th isNumeric>Data</Th>
                      </Tr>
                    </Thead>
                    <tbody>
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
                          <>
                            {filteredTransactions.map((transaction) => (
                              <Tr key={transaction.id}>
                                <Td width="30%">{transaction.name}</Td>
                                <Td>{transaction.metodo}</Td>
                                <Td>
                                  <PriceHighLight
                                    variant={
                                      transaction.status ||
                                      (() => selectedStatus)
                                    }
                                  >
                                    R$
                                    {transaction.status === 'outcome'
                                      ? '- '
                                      : ''}
                                    {formatPrice(parseFloat(transaction.preco))}
                                  </PriceHighLight>
                                </Td>
                                <Td>
                                  <p>{transaction.categoria}</p>
                                </Td>
                                <Td width="10%">
                                  {new Intl.DateTimeFormat('pt-BR').format(
                                    new Date(transaction.created_at),
                                  )}
                                </Td>
                                <Tooltip src={transaction.file}>
                                  <WrapItem>
                                    <Avatar
                                      name="teste"
                                      src={transaction.file}
                                    />
                                  </WrapItem>
                                </Tooltip>
                              </Tr>
                            ))}
                          </>
                        </>
                      )}
                    </tbody>
                  </>
                ) : (
                  <>
                    <NoData>Sem transacoes</NoData>
                  </>
                )}
              </>
            </Table>
          )}
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
