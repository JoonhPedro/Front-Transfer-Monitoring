import { useEffect, useState } from 'react'
import { Spinner, Table, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react'
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
import jsPDF from 'jspdf'
import { Download } from 'phosphor-react'
import * as Tooltip from '@radix-ui/react-tooltip'
import PaginationComponent from '../../components/Paginations'

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
  const [currentPage, setCurrentPage] = useState(1)
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

    const getStatusLabel = (status: string) => {
      return status === 'outcome' ? 'saída' : 'entrada'
    }

    doc.text(`Nome da Transferência: ${transaction.name}`, 10, 40)
    doc.text(`Categoria: ${transaction.categoria}`, 10, 80)
    doc.text(`Valor: R$ ${formatPrice(parseFloat(transaction.preco))}`, 10, 120)
    doc.text(`Método de Pagamento: ${transaction.metodo}`, 10, 160)
    doc.text(`Status: ${getStatusLabel(transaction.status)}`, 10, 200)
    doc.text(
      `Data de Transferência: ${new Intl.DateTimeFormat('pt-BR').format(
        new Date(transaction.created_at),
      )}`,
      10,
      240,
    )
    doc.text(`Observações: ${transaction.file}`, 10, 280)

    doc.save(`Transferencia_${transaction.name}.pdf`)
  }

  return (
    <>
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
      </div>
    </>
  )
}
