import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: 1128px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
`

export const Title = styled.h1``

export const Button = styled.button`
  height: 50px;
  border: 0;
  background: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: ${(props) => props.theme['green-700']};
  }
`

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

  td {
    padding: 1.25rem 2rem;
    background: ${(props) => props.theme['gray-700']};
    color: ${(props) => props.theme['gray-300']};
    border-bottom: 1px solid ${(props) => props.theme['gray-600']};
    &:first-child {
      border-bottom-left-radius: 5px;
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

export const ButtonCv = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  border: 0;
  padding: 1.07rem;
  font-weight: bold;
  border-radius: 6px;
  position: relative;
  left: 58.5rem;
  border: 1px solid ${(props) => props.theme['green-300']};
  bottom: 3.43rem;
  background: ${(props) => props.theme['green-500']};
  border-color: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};
  transition:
    background-color 0.2s,
    color 0.2s,
    border-color 0.2s;
  cursor: pointer;

  &:hover {
    background: transparent;
    color: ${(props) => props.theme['green-300']};
  }
`
export const Input = styled.div`
  input {
    flex: 2;
    border-radius: 6px;
    border: 0;
    background: ${(props) => props.theme['gray-900']};
    color: ${(props) => props.theme['gray-300']};
    padding: 1rem;

    &::placeholder {
      color: ${(props) => props.theme['gray-500']};
    }
  }
`
