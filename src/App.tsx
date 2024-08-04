import { GlobalStyle } from './styles/global'
import { AppRoutes } from './Routes/index'
import { Feedback } from './components/feedback'

export function App() {
  return (
    <>
      <GlobalStyle />
      <AppRoutes />
      <Feedback />
    </>
  )
}
