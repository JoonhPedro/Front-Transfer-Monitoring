import styled from 'styled-components'

export const Container = styled.div`
  width: 300px;
  margin: 15rem auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Title = styled.h2`
  margin-bottom: 1rem;
`

export const Form = styled.form`
  width: 100%;
`

export const FormGroup = styled.div`
  margin-bottom: 1rem;
`

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`

export const Input = styled.input`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
  }
`

export const Error = styled.p`
  color: red;
  text-align: center;
`
