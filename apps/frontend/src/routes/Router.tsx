import { Routes, Route } from 'react-router-dom'
import App from '../App'
import { Home } from '../pages/Home'
import { Acess } from '../pages/Acess'
import { AdminDashboard } from '../pages/AdminDashboard'
import { ClientDashboard } from '../pages/ClientDashboard'

export const MyRouter = () => {
  return (
    <Routes>
      <Route index element={<Home/>} />
      <Route path="about" element={<App/>} />
      <Route path='login' element={<Acess/>} />
      <Route path='register' element={<App/>} />
      <Route path='admin' element={<AdminDashboard/>} />
      <Route path='client' element={<ClientDashboard/>} />
    </Routes>
  )
}
