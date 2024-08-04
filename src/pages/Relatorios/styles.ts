import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: 1128px;
  margin: 0 auto;
  padding: 1.5rem 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const ContainerTable = styled.div`
  height: auto;
  max-width: 1128px;
  margin: 40px auto;
  border-radius: 20px;
  padding: 0.5rem 1.5rem 0;
  background: ${(props) => props.theme['gray-700']};
`

export const Header = styled.div`
  padding: 1.5rem 2.5rem 0;
  svg {
    color: ${(props) => props.theme['green-500']};
  }
`

export const DatePickerContainer = styled.div`
  display: flex;
  gap: 15px;
`

export const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
`

export const Title = styled.h1`
  font-weight: bold;
  padding: 1rem 0 0;
`

export const Button = styled.button`
  border: 0;
  background: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};
  font-weight: bold;
  padding: 0.7rem;
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
  margin: 0 auto;
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
  border: 0;
  padding: 0.7rem;
  background: transparent;
  border: 1px solid ${(props) => props.theme['green-300']};
  color: ${(props) => props.theme['green-300']};
  font-weight: bold;
  border-radius: 6px;

  &:hover {
    background: ${(props) => props.theme['green-500']};
    border-color: ${(props) => props.theme['green-500']};
    color: ${(props) => props.theme.white};
    transition:
      background-color 0.2s,
      color 0.2s,
      border-color 0.2s;
    cursor: pointer;
  }
`
export const Input = styled.div`
  input {
    flex: 2;
    border-radius: 6px;
    border: 0;
    background: ${(props) => props.theme['gray-900']};
    color: ${(props) => props.theme['gray-300']};
    padding: 0.7rem;

    &::placeholder {
      color: ${(props) => props.theme['gray-500']};
    }
    padding: 0.7rem 2rem;
  }
`

export const Total = styled.div`
  padding: 0.6rem 1rem;
  margin: 0 1rem;
  width: 200px;
  background: ${(props) => props.theme['gray-900']};
  border-radius: 10px;
  border: 1px solid;
  opacity: 0.8;
`

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

export const Icon = styled.div`
  position: absolute;
  left: 10px;
  color: #999;
  cursor: pointer;
  svg {
    color: ${(props) => props.theme['green-500']};
  }
`
