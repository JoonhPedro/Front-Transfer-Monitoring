import React, { useEffect, useState } from 'react'
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
import { api } from '../../../services/api'
import { useNavigate } from 'react-router-dom'

const SignUpComponent: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
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
      const response = await api.post('/users', {
        email,
        password,
        name,
      })
      navigate('/')
      return response
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError('Falha ao criar conta. Verifique os dados fornecidos.')
      } else {
        setError('Erro inesperado. Tente novamente.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Title>Cadastro</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Nome:</Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormGroup>
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
          {loading ? 'Criando...' : 'Cadastrar'}
        </Button>
        {error && <Title>{error}</Title>}
      </Form>
    </Container>
  )
}

export default SignUpComponent
