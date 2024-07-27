import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Title,
} from './styles'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../../../services/api'

const LoginComponent: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
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
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Senha:</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        <Button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>
        <p>
          <Link to="/signUp">Criar uma conta</Link>
        </p>
        {error && <Title>{error}</Title>}
      </Form>
    </Container>
  )
}

export default LoginComponent
