import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
`

export const Button = styled.button`
  padding: 0.6rem 0.9rem;
  text-decoration: none;
  margin-left: 0.5rem;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`
