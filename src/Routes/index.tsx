import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Transactions } from '../pages/transactions'
import { Relatorios } from '../pages/Relatorios'
import LoginComponent from '../pages/Acess/login'
import SignUpComponent from '../pages/Acess/signUp'
import PrivateRoute from '../context/PrivateRoute'
import { FourTransactions } from '../components/FourTransactions'
import { NotFoundPage } from '../components/NotFoundPage'

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FourTransactions />} />
        <Route path="/Login" element={<LoginComponent />} />
        <Route path="/signUp" element={<SignUpComponent />} />
        <Route element={<PrivateRoute />}>
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/transactions" element={<Transactions />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}
