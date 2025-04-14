import { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { Summary } from '../../components/Summary'
import { api } from '../../services/api'
import { SearchForm } from '../transactions/layout/components/SerchForm'
import { TransactionsContainer } from './style'
import { TableTransactions } from '../transactions/layout/components/TableTransactions'
import { Header } from '../../components/Header'
import html2pdf from 'html2pdf.js'
import { formatDate, formatPrice } from '../../format'

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
    'income' | 'outcome' | undefined
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
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
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
          (!selectedStatus || transaction.status === selectedStatus)
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
      setSelectedStatus(status as 'income' | 'outcome')
    } catch (err) {
      console.error((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const handlePagination = (page: number) => {
    setCurrentPage(page)
  }

  const generatePDF = (id: string) => {
    const transaction = transactions.find((item) => item.id === id)

    if (!transaction) {
      toast({
        title: 'Transação não encontrada.',
        colorScheme: 'red',
        duration: 1500,
        isClosable: true,
        position: 'top-right',
      })
      return
    }

    const pdfContent = `
   <div style="font-family: Arial, sans-serif; margin: 20px; padding: 20px; border-radius: 8px; width: 600px; border: 1px solid black; background-color: white;">
      <h1 style="color: #000000; text-align: center; text-decoration: none; padding-bottom: 1rem;">Comprovante de Transação</h1>
      <div style="margin-bottom: 20px;">
        <p style="color: #000000;"><strong>Comprovante gerado em </strong></p>
        <p style="color: #333; padding-bottom: 1rem;"> ${formatDate(new Date())} </p>
        <h3 style="color: #000000;"><strong>Valor</strong></h3>
        <h2 style="color: #000000;"> R$ ${formatPrice(parseFloat(transaction.preco))}</h2>
        <h3 style="padding: 1rem 0; color: #000000;" ><strong>Informaçäo de Transferência</strong></h3>
        <p style="color: #000000;";><strong>Nome da Transferência</strong></p>
        <p style="color: #333; padding-bottom: 1rem;">${transaction.name}</p>
        <p style="color: #000000;"><strong>Categoria</strong></p>
        <p style="color: #333; padding-bottom: 1rem;">${transaction.categoria}</p>
        <p style="color: #000000;"><strong>Método de Pagamento</strong></p>
        <p style="color: #333; padding-bottom: 1rem;">${transaction.metodo}</p>
        <p style="color: #000000;"><strong>Status</strong></p>
        <p style="color: #333; padding-bottom: 1rem;">${getStatusLabel(transaction.status)}</p>
        <p style="color: #000000;"><strong>Data de Transferência</strong></p>
        <p style="color: #333; padding-bottom: 1rem;">${new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.created_at))}</p>
        <p style="color: #000000;"><strong>Observações</strong></p>
        <p style="color: #333; padding-bottom: 1rem;">${transaction.observations || 'Sem observações'}</p>
      </div>
      <footer style="text-align: center; margin-top: 20px; font-size: 0.9em; color: #666;">
        <p>Emitido por Four transaction</p>
      </footer>
    </div>
    `

    const element = document.createElement('div')
    element.innerHTML = pdfContent
    document.body.appendChild(element)

    html2pdf()
      .from(element)
      .save(`Transferencia_${transaction.name}.pdf`)
      .then(() => {
        document.body.removeChild(element)
      })
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
        <TableTransactions
          loading={loading}
          filteredTransactions={filteredTransactions}
          currentPage={currentPage}
          totalPages={Math.ceil(filteredTransactions.length / 5)}
          handlePagination={handlePagination}
          selectedStatus={handleSelectedStatusChange}
          handlePdf={generatePDF}
        />
      </TransactionsContainer>
    </>
  )
}
