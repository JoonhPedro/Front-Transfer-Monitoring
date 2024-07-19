import React from 'react'
import { Button, Container } from './styles'

interface PaginationProps {
  currentPage: number
  totalPages: number
  handlePagination: (page: number) => void
}

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  handlePagination,
}) => {
  const pagesArray = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <Container>
      {pagesArray.map((pageNumber) => (
        <Button
          key={pageNumber}
          onClick={() => handlePagination(pageNumber)}
          style={{
            fontWeight: pageNumber === currentPage ? 'bold' : 'normal',
            border: pageNumber === currentPage ? '1px solid #202024' : 'none',
            background: pageNumber === currentPage ? '#00875F' : 'none',
          }}
        >
          {pageNumber}
        </Button>
      ))}
    </Container>
  )
}

export default PaginationComponent
