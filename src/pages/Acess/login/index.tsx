import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Button,
  ButtonContainer,
  Container,
  Form,
  FormGroup,
  Input,
  Register,
  Title,
  InputWrapper,
  Icon,
  IconPassword,
} from './styles'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../../../services/api'
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md'

const LoginComponent: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/transactions')
    }
  }, [navigate])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await api.post('/login', {
        email,
        password,
      })
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      navigate('/transactions')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError('Falha ao fazer login. Verifique seu email e senha.')
      } else {
        setError('Erro inesperado. Tente novamente.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Title>LOGIN</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <InputWrapper>
            <Icon>
              <MdEmail />
            </Icon>
            <Input
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputWrapper>
        </FormGroup>
        <FormGroup>
          <InputWrapper>
            <Icon>
              <MdLock />
            </Icon>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <IconPassword onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </IconPassword>
          </InputWrapper>
        </FormGroup>
        <ButtonContainer>
          <Button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
          <a href="">Esqueceu a senha ?</a>
        </ButtonContainer>
        <Register>
          <a>
            <Link to="/signUp">Register</Link>
          </a>
        </Register>
        {error && <Title>{error}</Title>}
      </Form>
    </Container>
  )
}

export default LoginComponent
