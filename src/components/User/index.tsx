import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import {
  CloseButton,
  Container,
  ContainerUser,
  Content,
  Logo,
  NameUserLogo,
  Overlay,
} from './styles'
import { useToast } from '@chakra-ui/react'

interface UserProps {
  id: string
  name: string
  email: string
}

export function ModalUser() {
  const [users, setUsers] = useState<UserProps[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const toast = useToast()

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await api.get('/users')
        setUsers(response.data)
      } catch (err) {
        console.error((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  const userJson = localStorage.getItem('user')
  let userId: string | null = null

  if (userJson) {
    try {
      const user = JSON.parse(userJson)
      userId = user.id
    } catch (error) {
      console.error('Erro ao analisar o JSON do usuário:', error)
      return
    }
  }
  const filterUser = users.find((user) => user.id === userId)

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
    toast({
      title: 'Desconectado com sucesso!',
      status: 'success',
      duration: 1500,
      isClosable: true,
      position: 'top-right',
    })
  }

  const logoUserName = filterUser?.name
    ?.split(' ')
    .slice(0, 2)
    .map((item) => item.at(0))
    .join('')
    .toLocaleUpperCase()

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Usuários</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <Container>
          <Logo>
            <div>
              <NameUserLogo>{logoUserName}</NameUserLogo>{' '}
            </div>
          </Logo>
          <ContainerUser>
            {filterUser && (
              <>
                {loading ? (
                  <p>Carregando...</p>
                ) : (
                  <>
                    <p>{filterUser.name || ''}</p>
                    <p>{filterUser.email || ''}</p>
                  </>
                )}
              </>
            )}
          </ContainerUser>
        </Container>
        <button onClick={handleLogout}>Sair</button>
      </Content>
    </Dialog.Portal>
  )
}
