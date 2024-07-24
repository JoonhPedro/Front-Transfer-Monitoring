import { useState, useEffect } from 'react'
import { Spinner, Table, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react'
import * as Tooltip from '@radix-ui/react-tooltip'
import jsPDF from 'jspdf'
import { Download } from 'phosphor-react'
import { Header } from '../../components/Header'
import PaginationComponent from '../../components/Paginations'
import { Summary } from '../../components/Summary'
import { formatPrice } from '../../format/price'
import { api } from '../../services/api'
import { SearchForm } from './components/SerchForm'
import {
  ButtonCv,
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
  observations: string
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
  const [currentPage, setCurrentPage] = useState(1)
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null
    endDate: Date | null
  }>({ startDate: null, endDate: null })
  const toast = useToast()

  useEffect(() => {
    loadTransactions()
  }, [])

  useEffect(() => {
    handlePagination(currentPage)
  }, [currentPage])

  async function loadTransactions() {
    try {
      setLoading(true)
      const response = await api.get('/transactions')
      const sortedTransactions = response.data.sort(
        (a: TransactionsProps, b: TransactionsProps) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )
      setTransactions(sortedTransactions)
      setFilteredTransactions(sortedTransactions)
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
          (!selectedStatus || transaction.status === selectedStatus) &&
          (!dateRange.startDate ||
            new Date(transaction.created_at) >= dateRange.startDate) &&
          (!dateRange.endDate ||
            new Date(transaction.created_at) <= dateRange.endDate),
      )
      setFilteredTransactions(filtered)
    } catch (err) {
      console.error((err as Error).message)
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
      console.error((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const handlePagination = (page: number) => {
    setCurrentPage(page)
  }

  function handlePdf(id: string) {
    const transaction = transactions.find((item) => item.id === id)

    if (!transaction) {
      toast({
        title: 'Transação não encontrada.',
        status: 'error',
        duration: 1500,
        isClosable: true,
        position: 'top-right',
      })
      return
    }
    // eslint-disable-next-line new-cap
    const doc = new jsPDF('p', 'pt')

    doc.text(`Nome da Transferência: ${transaction.name}`, 10, 40)
    doc.text(`Categoria: ${transaction.categoria}`, 10, 80)
    doc.text(`Valor: R$ ${formatPrice(parseFloat(transaction.preco))}`, 10, 120)
    doc.text(`Método de Pagamento: ${transaction.metodo}`, 10, 160)
    doc.text(`Status: ${getStatusLabel(transaction.status)}`, 10, 200)
    doc.text(
      `Data de Transferência: ${new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.created_at))}`,
      10,
      240,
    )
    doc.text(
      `Observações: ${transaction.observations || 'Sem observações'}`,
      10,
      280,
    )

    doc.save(`Transferencia_${transaction.name}.pdf`)
  }

  const downloadCSV = () => {
    try {
      setLoading(true)
      const csvContent = generateCSV(transactions)
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'transactions.csv'
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      toast({
        title: 'Transações não encontrada...',
        status: 'error',
        duration: 1500,
        isClosable: true,
        position: 'top-right',
      })
    } finally {
      setLoading(false)
    }
  }

  const generateCSV = (data: TransactionsProps[]) => {
    const header = Object.keys(data[0]).join(',') + '\n'
    const body = data
      .map((transaction) => Object.values(transaction).join(',') + '\n')
      .join('')
    return header + body
  }

  const handleDateRangeChange = (
    startDate: Date | null,
    endDate: Date | null,
  ) => {
    setDateRange({ startDate, endDate })
  }

  const getStatusLabel = (status: string) => {
    return status === 'outcome' ? 'saída' : 'entrada'
  }

  return (
    <>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm
          onSearch={handleSearch}
          setSelectedStatus={handleSelectedStatusChange}
          onDateRangeChange={handleDateRangeChange}
        />
        <ButtonCv onClick={downloadCSV}>Download CSV</ButtonCv>
        <TransactionsTable>
          {loading ? (
            <NoData>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </NoData>
          ) : filteredTransactions.length > 0 ? (
            <>
              <Table variant={'gray'}>
                <Thead>
                  <Tr>
                    <Th>Transferência</Th>
                    <Th>Método</Th>
                    <Th>Preço</Th>
                    <Th>Status</Th>
                    <Th isNumeric>Data</Th>
                    <Th>Ações</Th>
                  </Tr>
                </Thead>
                <tbody>
                  {filteredTransactions
                    .slice((currentPage - 1) * 5, currentPage * 5)
                    .map((transaction) => (
                      <Tr key={transaction.id}>
                        <Td width="20%">{transaction.name || ''}</Td>
                        <Td>{transaction.metodo || ''}</Td>
                        <Td>
                          <PriceHighLight
                            variant={
                              transaction.status || (() => selectedStatus)
                            }
                          >
                            R$
                            {transaction.status === 'outcome' ? ' -' : ' '}
                            {formatPrice(parseFloat(transaction.preco || ''))}
                          </PriceHighLight>
                        </Td>
                        <Td>
                          <p>{transaction.categoria}</p>
                        </Td>
                        <Td width="10%">
                          {new Intl.DateTimeFormat('pt-BR').format(
                            new Date(transaction.created_at || ''),
                          )}
                        </Td>
                        <Td>
                          <Tooltip.Provider>
                            <Tooltip.Root>
                              <Tooltip.Trigger asChild>
                                <button
                                  onClick={() => handlePdf(transaction.id)}
                                >
                                  <Download />
                                </button>
                              </Tooltip.Trigger>
                              <Tooltip.Portal>
                                <Tooltip.Content
                                  className="TooltipContent"
                                  sideOffset={10}
                                  side="right"
                                >
                                  Download PDF
                                </Tooltip.Content>
                              </Tooltip.Portal>
                            </Tooltip.Root>
                          </Tooltip.Provider>
                        </Td>
                      </Tr>
                    ))}
                </tbody>
              </Table>
              <PaginationComponent
                currentPage={currentPage}
                totalPages={Math.ceil(filteredTransactions.length / 5)}
                handlePagination={handlePagination}
              />
            </>
          ) : (
            <>
              <NoData>Sem transações</NoData>
            </>
          )}
        </TransactionsTable>
      </TransactionsContainer>
    </>
  )
}
