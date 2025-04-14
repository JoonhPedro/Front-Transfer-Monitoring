import styled from 'styled-components'

export const Container = styled.div`
  width: 400px;
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

export const Register = styled.h1`
  text-align: center;
  padding: 1rem 0 0;
  a {
    color: #ffffff;
    &:hover {
      opacity: 0.7;
    }
  }
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
  padding: 0.4rem 2rem;
  border: none;
  border-radius: 4px;
  background: transparent;
  border-bottom: 2px solid #ccc;
  transition: 0.5s;

  &:focus {
    outline: none;
    border-radius: 3px;
    border-bottom: 3px solid ${(props) => props.theme['green-500']};
    box-shadow:
      0 0 0 0 ${(props) => props.theme['green-500']} inset,
      0 0 5px 2px ${(props) => props.theme['green-500']};
  }
`

export const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  width: 50%;
  border: 1px solid;
  border-radius: 20px;
  background-color: ${(props) => props.theme['green-500']};
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
  &:disabled {
    background: transparent;
    color: ${(props) => props.theme['green-300']};
  }
  &:hover {
    background: transparent;
    color: ${(props) => props.theme['green-300']};
  }
`
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 2rem;
  padding: 0.5rem 0;

  p {
    color: #045880;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
`

export const ButtonLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

export const LoginCheck = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

export const Error = styled.p`
  color: red;
  text-align: center;
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
`

export const IconPassword = styled.div`
  position: absolute;
  right: 10px;
  color: #999;
  cursor: pointer;
`
