// import { Link } from 'react-router-dom'
import {
  ButtonContainer,
  Container,
  Title,
  Button,
  TransactionsContainer,
  TransactionsTable,
  Input,
} from './styles'
import { TableTransactions } from '../transactions/layout/components/TableTransactions'
import { TransactionsProps } from '../transactions'
import { useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import jsPDF from 'jspdf'
import { formatPrice } from '../../format/price'
import { api } from '../../services/api'
import DatePicker from 'react-datepicker'

export function Relatorios() {
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
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null
    endDate: Date | null
  }>({
    startDate: null,
    endDate: null,
  })

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
  const getStatusLabel = (status: string) => {
    return status === 'outcome' ? 'saída' : 'entrada'
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
      `Data de Transferência: ${new Intl.DateTimeFormat('pt-BR').format(
        new Date(transaction.created_at),
      )}`,
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

  // const downloadCSV = () => {
  //   try {
  //     setLoading(true)
  //     const csvContent = generateCSV(transactions)
  //     const blob = new Blob([csvContent], { type: 'text/csv' })
  //     const url = URL.createObjectURL(blob)
  //     const a = document.createElement('a')
  //     a.href = url
  //     a.download = 'transactions.csv'
  //     a.click()
  //     URL.revokeObjectURL(url)
  //   } catch (error) {
  //     toast({
  //       title: 'Transações não encontrada...',
  //       status: 'error',
  //       duration: 1500,
  //       isClosable: true,
  //       position: 'top-right',
  //     })
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // const generateCSV = (data: TransactionsProps[]) => {
  //   const header = Object.keys(data[0]).join(',') + '\n'
  //   const body = data
  //     .map((transaction) => Object.values(transaction).join(',') + '\n')
  //     .join('')
  //   return header + body
  // }
  const handleSearch = () => {
    try {
      setLoading(true)
      const filtered = transactions.filter(
        (transaction) =>
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

  const handleDateRangeChange = (
    startDate: Date | null,
    endDate: Date | null,
  ) => {
    setDateRange({ startDate, endDate })
  }

  const handleStartDateChange = (date: Date | null) => {
    setDateRange((prevDateRange) => ({
      ...prevDateRange,
      startDate: date,
    }))
    handleDateRangeChange(date, dateRange.endDate)
  }

  const handleEndDateChange = (date: Date | null) => {
    setDateRange((prevDateRange) => ({
      ...prevDateRange,
      endDate: date,
    }))
    handleDateRangeChange(dateRange.startDate, date)
  }

  // console.log(handleSearch)

  return (
    <>
      <Container>
        <Title>Relatórios Transferencia</Title>
        <Input>
          <DatePicker
            selected={dateRange.startDate}
            onChange={handleStartDateChange}
            placeholderText="Data Inicial"
          />
        </Input>
        <Input>
          <DatePicker
            selected={dateRange.endDate}
            onChange={handleEndDateChange}
            placeholderText="Data Final"
          />
        </Input>
        <ButtonContainer>
          <Button onClick={handleSearch}>Visualizar</Button>
        </ButtonContainer>
      </Container>

      <TransactionsContainer>
        <TransactionsTable>
          <TableTransactions
            loading={loading}
            filteredTransactions={filteredTransactions}
            currentPage={currentPage}
            totalPages={Math.ceil(filteredTransactions.length / 5)}
            handlePagination={handlePagination}
            selectedStatus={handleSelectedStatusChange}
            handlePdf={handlePdf}
          />
        </TransactionsTable>
      </TransactionsContainer>
    </>
  )
}
