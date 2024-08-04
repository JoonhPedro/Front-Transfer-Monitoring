import { Container, Title, SubTitle } from './styles'
import NotFound from '../../assets/NotFound.svg'

export function NotFoundPage() {
  return (
    <>
      <Container>
        <Title>404 Error</Title>
        <SubTitle>Not Found</SubTitle>
        <img src={NotFound} alt="Not Found" />
      </Container>
    </>
  )
}
