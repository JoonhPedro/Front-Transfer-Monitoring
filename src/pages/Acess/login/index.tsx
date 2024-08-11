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
  ButtonLogin,
  LoginCheck,
} from './styles'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../../../services/api'
import {
  MdEmail,
  MdLock,
  MdLogin,
  MdVisibility,
  MdVisibilityOff,
} from 'react-icons/md'
import { Spinner, useToast } from '@chakra-ui/react'

const LoginComponent: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
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

    try {
      const response = await api.post('/login', {
        email,
        password,
      })
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      toast({
        title: 'Login Realizado com Sucesso',
        status: 'success',
        duration: 1500,
        isClosable: true,
        position: 'top-right',
      })
      navigate('/transactions')
    } catch (err) {
      console.log(axios.isAxiosError(err))
      if (axios.isAxiosError(err)) {
        // console.log(err.message)
        toast({
          title: err?.message,
          colorScheme: 'red',
          duration: 1500,
          isClosable: true,
          position: 'top-right',
        })
      }
      return
    } finally {
      setLoading(false)
    }
  }

  const forgotPassword = () => {
    navigate('/forgotPassoword')
    toast({
      title: 'Serviço Indisponivel no momento',
      colorScheme: 'red',
      duration: 1500,
      position: 'top-right',
    })
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
              {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
            </IconPassword>
          </InputWrapper>
        </FormGroup>
        <ButtonContainer>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <LoginCheck>
                  Entrando...
                  <Spinner
                    color="green.500"
                    thickness="1px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    size="xs"
                  />
                </LoginCheck>
              </>
            ) : (
              <ButtonLogin>
                <MdLogin /> Entrar
              </ButtonLogin>
            )}
          </Button>
          <p onClick={forgotPassword}>Esqueceu a senha ?</p>
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
