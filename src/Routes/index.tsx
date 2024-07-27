import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Transactions } from '../pages/transactions'
import { Relatorios } from '../pages/Relatorios'
import LoginComponent from '../pages/Acess/login'
import SignUpComponent from '../pages/Acess/signUp'
import PrivateRoute from '../context/PrivateRoute'
import { Login } from '../components/Login'

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<LoginComponent />} />
        <Route path="/signUp" element={<SignUpComponent />} />
        <Route element={<PrivateRoute />}>
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/transactions" element={<Transactions />} />
        </Route>
      </Routes>
    </Router>
  )
}
