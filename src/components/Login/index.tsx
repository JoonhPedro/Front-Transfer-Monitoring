import { Link } from 'react-router-dom'
import { Button, Container, Logo } from './styles'
import logo from '../../assets/logo.svg'
export function Login() {
  return (
    <>
      <Container>
        <Logo>
          <img src={logo} alt="" />
          <h1>Four Transactions</h1>
        </Logo>
        <Button>
          <Link to={'/Login'}>Ir para Login</Link>
        </Button>
      </Container>
    </>
  )
}
