import { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import jsPDF from 'jspdf'
import { Summary } from '../../components/Summary'
import { formatPrice } from '../../format/price'
import { api } from '../../services/api'
import { SearchForm } from '../transactions/layout/components/SerchForm'
import { ButtonCv, TransactionsContainer } from './style'
import { TableTransactions } from '../transactions/layout/components/TableTransactions'
import { Header } from '../../components/Header'

export interface TransactionsProps {
  id: string
  name: string
  categoria: string
  preco: string
  metodo: string
  observations: string
  status: 'income' | 'outcome'
  created_at: string
  updated_at: string
  userId: string
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
          (!selectedStatus || transaction.status === selectedStatus),
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
        />
        <ButtonCv onClick={downloadCSV}>Download CSV</ButtonCv>
        <TableTransactions
          loading={loading}
          filteredTransactions={filteredTransactions}
          currentPage={currentPage}
          totalPages={Math.ceil(filteredTransactions.length / 5)}
          handlePagination={handlePagination}
          selectedStatus={handleSelectedStatusChange}
          handlePdf={handlePdf}
        />
      </TransactionsContainer>
    </>
  )
}
