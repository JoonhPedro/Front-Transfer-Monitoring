import styled from 'styled-components'

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`
export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  padding-top: 1rem;

  td {
    padding: 1.25rem 2rem;
    background: ${(props) => props.theme['gray-700']};
    color: ${(props) => props.theme['gray-300']};

    &:first-child {
      border-bottom-left-radius: 6px;
    }
    &:last-child {
      border-bottom-left-radius: 0px;
    }
  }
`
interface PriceHighLightProps {
  variant: 'income' | 'outcome'
}

export const PriceHighLight = styled.span<PriceHighLightProps>`
  color: ${(props) =>
    props.variant === 'income'
      ? props.theme['green-300']
      : props.theme['red-300']};
`

export const NoData = styled.div`
  display: block;
  align-items: center;
  justify-content: center;
  text-align: center;
`
