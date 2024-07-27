import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 3rem auto;
  padding: 1.5rem;
  background-color: ${(props) => props.theme['gray-700']};
  text-align: center;
  border-radius: 10px;
`

export const Logo = styled.div`
  width: auto;
  display: flex;
  padding-bottom: 1rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  img {
    height: 50px;
  }
  h1 {
    font-size: 1.5rem;
  }
`

export const Button = styled.button`
  gap: 0.75rem;

  border: 0;
  padding: 0.7rem;
  font-weight: bold;
  border-radius: 6px;
  background: ${(props) => props.theme['green-500']};
  border-color: ${(props) => props.theme['green-500']};
  border: 1px solid ${(props) => props.theme['green-300']};
  color: ${(props) => props.theme.white};
  transition:
    background-color 0.2s,
    color 0.2s,
    border-color 0.2s;
  &:hover {
    background: transparent;
    color: ${(props) => props.theme['green-300']};
  }
`
