import { Spinner, Table, Td, Th, Thead, Tr } from '@chakra-ui/react'
import * as Tooltip from '@radix-ui/react-tooltip'
import { Download } from 'phosphor-react'
import PaginationComponent from '../../../../../components/Paginations'
import { formatPrice } from '../../../../../format/price'
import { TransactionsProps } from '../../../index'
import {
  NoData,
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'

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
      console.log('Recuperando userId:', userId)
    } catch (error) {
      console.error('Erro ao analisar o JSON do usuário:', error)
      return
    }
  }
  const filterUser = filteredTransactions.find(
    (transactions) => transactions.userId === userId,
  )

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
          ) : filteredTransactions.length > 0 ? (
            <>
              {filterUser && (
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
                                {formatPrice(
                                  parseFloat(transaction.preco || ''),
                                )}
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
              )}
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
