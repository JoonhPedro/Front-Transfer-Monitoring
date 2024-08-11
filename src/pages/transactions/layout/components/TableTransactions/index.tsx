import { Spinner, Table, Td, Th, Thead, Tr } from '@chakra-ui/react'
import * as Tooltip from '@radix-ui/react-tooltip'
import PaginationComponent from '../../../../../components/Paginations'
import { formatPrice } from '../../../../../format/price'
import { TransactionsProps } from '../../../index'
import {
  NoData,
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'
import { FaFileDownload } from 'react-icons/fa'

export interface TableTransactionsProps {
  loading: boolean
  filteredTransactions: TransactionsProps[]
  currentPage: number
  totalPages: number
  handlePagination: (page: number) => void
  selectedStatus: (status: string) => void
  handlePdf: (id: string) => void
}

export function TableTransactions({
  loading,
  filteredTransactions,
  currentPage,
  handlePagination,
  selectedStatus,
  handlePdf,
}: TableTransactionsProps) {
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

  const userTransactions = filteredTransactions.filter(
    (transaction) => transaction.userId === userId
  )

  const transactionsPerPage = 5
  const startSequence = (currentPage - 1) * transactionsPerPage + 1

  return (
    <>
      <TransactionsContainer>
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
          ) : userTransactions.length > 0 ? (
            <>
              <Table variant={'gray'}>
                <Thead>
                  <Tr>
                    <Th>Sequence</Th>
                    <Th>Transferência</Th>
                    <Th>Método</Th>
                    <Th>Preço</Th>
                    <Th>Categoria</Th>
                    <Th isNumeric>Data</Th>
                    <Th>Ações</Th>
                  </Tr>
                </Thead>
                <tbody>
                  {userTransactions
                    .slice(
                      (currentPage - 1) * transactionsPerPage,
                      currentPage * transactionsPerPage
                    )
                    .map((transaction, index) => (
                      <Tr key={transaction.id}>
                        <Td>{startSequence + index}</Td>
                        <Td width="10%">{transaction.name || ''}</Td>
                        <Td>{transaction.metodo || ''}</Td>
                        <Td>
                          <PriceHighLight
                            variant={
                              transaction.status || (() => selectedStatus)
                            }
                          >
                            R$
                            {transaction.status === 'outcome' ? ' -' : ' '}
                            {formatPrice(
                              parseFloat(transaction.preco || 'NaN')
                            )}
                          </PriceHighLight>
                        </Td>
                        <Td>{transaction.categoria}</Td>
                        <Td width="10%">
                          {new Intl.DateTimeFormat('pt-BR').format(
                            new Date(transaction.created_at || '')
                          )}
                        </Td>
                        <Td>
                          <Tooltip.Provider>
                            <Tooltip.Root>
                              <Tooltip.Trigger asChild>
                                <button
                                  onClick={() => handlePdf(transaction.id)}
                                >
                                  <FaFileDownload />
                                </button>
                              </Tooltip.Trigger>
                              <Tooltip.Portal>
                                <Tooltip.Content
                                  className="TooltipContent"
                                  sideOffset={10}
                                  side="top"
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
                totalPages={Math.ceil(
                  userTransactions.length / transactionsPerPage
                )}
                handlePagination={handlePagination}
              />
            </>
          ) : (
            <NoData>Sem transações</NoData>
          )}
        </TransactionsTable>
      </TransactionsContainer>
    </>
  )
}
