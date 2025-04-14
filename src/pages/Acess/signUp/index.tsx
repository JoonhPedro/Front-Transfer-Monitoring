import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Button,
  ButtonContainer,
  Container,
  Form,
  FormGroup,
  Header,
  Icon,
  IconPassword,
  Input,
  InputWrapper,
  Title,
} from './styles'
import { api } from '../../../services/api'
import { useNavigate } from 'react-router-dom'
import {
  MdEmail,
  MdLock,
  MdOutlinePerson,
  MdVisibility,
  MdVisibilityOff,
} from 'react-icons/md'
import { useToast } from '@chakra-ui/react'
import { IoArrowBack } from 'react-icons/io5'

const SignUpComponent: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()

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

    if (password !== confirmPassword) {
      toast({
        title: 'As senhas não coincidem',
        status: 'warning',
        duration: 1500,
        isClosable: true,
        position: 'top-right',
      })
      setLoading(false)
      return
    }

    try {
      const response = await api.post('/users', {
        email,
        password,
        name,
      })
      toast({
        title: 'Cadastro Realizado com Sucesso',
        status: 'success',
        duration: 1500,
        isClosable: true,
        position: 'top-right',
      })
      navigate('/')
      return response
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast({
          title: err.response?.data?.error,
          status: 'warning',
          duration: 1500,
          isClosable: true,
          position: 'top-right',
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    navigate('/login')
  }

  return (
    <Container>
      <Header>
        <button onClick={handleBack}>
          <IoArrowBack size={20} />
        </button>
        <Title>Cadastro</Title>
      </Header>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <InputWrapper>
            <Icon>
              <MdOutlinePerson />
            </Icon>
            <Input
              type="text"
              placeholder="Nome"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </InputWrapper>
        </FormGroup>
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
              {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
            </IconPassword>
          </InputWrapper>
        </FormGroup>
        <FormGroup>
          <InputWrapper>
            <Icon>
              <MdLock />
            </Icon>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirme a Senha"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <IconPassword onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
            </IconPassword>
          </InputWrapper>
        </FormGroup>
        <ButtonContainer>
          <Button type="submit" disabled={loading}>
            {loading ? 'Criando...' : 'Cadastrar'}
          </Button>
        </ButtonContainer>
        {error && <Title>{error}</Title>}
      </Form>
    </Container>
  )
}

export default SignUpComponent
