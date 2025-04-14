import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useToast } from '@chakra-ui/react'
import jsPDF from 'jspdf'
import { formatPrice } from '../../format/price'
import { api } from '../../services/api'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { MdOutlineDateRange } from 'react-icons/md'
import {
  ButtonContainer,
  Container,
  Title,
  Button,
  TransactionsContainer,
  TransactionsTable,
  Input,
  DatePickerContainer,
  ContainerTable,
  Header,
  Total,
  ButtonCv,
  InputWrapper,
  Icon,
} from './styles'
import { TableTransactions } from '../transactions/layout/components/TableTransactions'
import { TransactionsProps } from '../transactions'

export function Relatorios() {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([])
  const [filteredTransactions, setFilteredTransactions] = useState<
    TransactionsProps[]
  >([])
  const [selectedStatus, setSelectedStatus] = useState<'income' | 'outcome'>()
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  const toast = useToast()
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null
    endDate: Date | null
  }>({
    startDate: null,
    endDate: null,
  })
  const navigate = useNavigate()

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
        status as 'income' | 'outcome' | (() => 'income' | 'outcome')
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
        colorScheme: 'red',
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
        new Date(transaction.created_at)
      )}`,
      10,
      240
    )
    doc.text(
      `Observações: ${transaction.observations || 'Sem observações'}`,
      10,
      280
    )

    doc.save(`Transferencia_${transaction.name}.pdf`)
  }

  const handleSearch = () => {
    try {
      setLoading(true)
      if (dateRange.startDate && dateRange.endDate) {
        const filtered = transactions.filter(
          (transaction) =>
            (!selectedStatus || transaction.status === selectedStatus) &&
            new Date(transaction.created_at) >= dateRange.startDate! &&
            new Date(transaction.created_at) <= dateRange.endDate!
        )
        if (filtered.length === 0) {
          toast({
            title: 'Não há transações nesse intervalo de datas.',
            colorScheme: 'red',
            duration: 1500,
            isClosable: true,
            position: 'top-right',
          })
        } else {
          setFilteredTransactions(filtered)
          const totalIncome = filtered.reduce(
            (acc, transaction) =>
              acc +
              (transaction.status === 'income'
                ? parseFloat(transaction.preco)
                : 0),
            0
          )
          const totalOutcome = filtered.reduce(
            (acc, transaction) =>
              acc +
              (transaction.status === 'outcome'
                ? parseFloat(transaction.preco)
                : 0),
            0
          )
          setTotal(totalIncome - totalOutcome)
        }
      } else {
        toast({
          title: 'Por favor, selecione um intervalo de datas.',
          colorScheme: 'red',
          duration: 1500,
          isClosable: true,
          position: 'top-right',
        })
      }
    } catch (err) {
      console.error((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const downloadCSV = () => {
    try {
      setLoading(true)
      const userJson = localStorage.getItem('user')
      let userId: string | null = null

      if (userJson) {
        try {
          const user = JSON.parse(userJson)
          userId = user.id
        } catch (error) {
          console.error('Erro ao analisar o JSON do usuário:', error)
          return
        }
      }

      const userFilteredTransactions = filteredTransactions.filter(
        (transaction) => transaction.userId === userId
      )

      if (userFilteredTransactions.length === 0) {
        toast({
          title:
            'Nenhuma transação encontrada para o usuário logado no intervalo de datas selecionado.',
          colorScheme: 'red',
          duration: 1500,
          isClosable: true,
          position: 'top-right',
        })
        return
      }

      const csvContent = generateCSV(userFilteredTransactions)
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'transactions.csv'
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      toast({
        title: 'Erro ao gerar o CSV.',
        colorScheme: 'red',
        duration: 1500,
        isClosable: true,
        position: 'top-right',
      })
    } finally {
      setLoading(false)
    }
  }

  const generateCSV = (data: TransactionsProps[]) => {
    if (data.length === 0) {
      return 'Nenhuma transação encontrada para o usuário logado no intervalo de datas selecionado.'
    }

    const header = Object.keys(data[0]).join(',') + '\n'
    const body = data
      .map((transaction) => Object.values(transaction).join(',') + '\n')
      .join('')
    return header + body
  }

  const handleBack = () => {
    navigate('/transactions')
  }

  const handleStartDateChange = (date: Date | null) => {
    setDateRange((prevDateRange) => ({
      ...prevDateRange,
      startDate: date,
    }))
  }

  const handleEndDateChange = (date: Date | null) => {
    setDateRange((prevDateRange) => ({
      ...prevDateRange,
      endDate: date,
    }))
  }

  return (
    <>
      <ContainerTable>
        <Header>
          <button onClick={handleBack}>
            <IoArrowBack size={20} />
          </button>
          <Title>Relatórios Transferência</Title>
        </Header>
        <Container>
          <DatePickerContainer>
            <InputWrapper>
              <Input>
                <DatePicker
                  selected={dateRange.startDate}
                  onChange={handleStartDateChange}
                  placeholderText="Data Inicial"
                  dateFormat="dd/MM/yyyy"
                  required
                />
              </Input>
              <Icon>
                <MdOutlineDateRange />
              </Icon>
            </InputWrapper>
            <InputWrapper>
              <Input>
                <DatePicker
                  selected={dateRange.endDate}
                  onChange={handleEndDateChange}
                  placeholderText="Data Final"
                  dateFormat="dd/MM/yyyy"
                  required
                />
              </Input>
              <Icon>
                <MdOutlineDateRange />
              </Icon>
            </InputWrapper>
            <ButtonContainer>
              <Button onClick={handleSearch}>Visualizar</Button>
            </ButtonContainer>
            <ButtonContainer>
              <ButtonCv onClick={downloadCSV}>Baixar CSV</ButtonCv>
            </ButtonContainer>
          </DatePickerContainer>
        </Container>

        <TransactionsContainer>
          <TransactionsTable>
            {filteredTransactions.length > 0 && (
              <>
                <Total>Total: R$ {formatPrice(total)}</Total>
                <TableTransactions
                  loading={loading}
                  filteredTransactions={filteredTransactions}
                  currentPage={currentPage}
                  totalPages={Math.ceil(filteredTransactions.length / 5)}
                  handlePagination={handlePagination}
                  selectedStatus={handleSelectedStatusChange}
                  handlePdf={handlePdf}
                />
              </>
            )}
          </TransactionsTable>
        </TransactionsContainer>
      </ContainerTable>
    </>
  )
}
