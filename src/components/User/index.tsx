import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const [user, setUser] = useState<UserProps | null>(null)
  const navigate = useNavigate()
  const toast = useToast()

  useEffect(() => {
    const userJson = localStorage.getItem('user')

    if (userJson) {
      try {
        const parsedUser = JSON.parse(userJson)
        setUser(parsedUser)
      } catch (error) {
        console.error('Erro ao analisar informação do usuário:', error)
      }
    }
  }, [])

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

  const logoUserName = user?.name
    ?.split(' ')
    .slice(0, 2)
    .map((item) => item.at(0))
    .join('')
    .toUpperCase()

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Perfil</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <Container>
          <Logo>
            <div>
              <NameUserLogo>{logoUserName}</NameUserLogo>
            </div>
          </Logo>
          <ContainerUser>
            {user ? (
              <>
                <p>{user.name || ''}</p>
                <p>{user.email || ''}</p>
              </>
            ) : (
              <p>Carregando...</p>
            )}
          </ContainerUser>
        </Container>
        <button onClick={handleLogout} disabled={!user}>
          {user ? 'Sair' : 'Carregando...'}
        </button>
      </Content>
    </Dialog.Portal>
  )
}
