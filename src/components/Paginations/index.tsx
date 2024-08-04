import React from 'react'
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io'
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

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePagination(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePagination(currentPage + 1)
    }
  }

  return (
    <Container>
      <IoMdArrowDropleft
        onClick={handlePreviousPage}
        style={{ cursor: 'pointer', marginRight: '10px' }}
      />
      {pagesArray.map((pageNumber) => (
        <Button
          key={pageNumber}
          onClick={() => handlePagination(pageNumber)}
          style={{
            fontWeight: pageNumber === currentPage ? 'bold' : 'normal',
            border:
              pageNumber === currentPage
                ? '1px solid #202024'
                : '1px solid #00875f',
            background: pageNumber === currentPage ? '#00875F' : 'none',
          }}
        >
          {pageNumber}
        </Button>
      ))}
      <IoMdArrowDropright
        onClick={handleNextPage}
        style={{ cursor: 'pointer', marginLeft: '10px' }}
      />
    </Container>
  )
}

export default PaginationComponent
