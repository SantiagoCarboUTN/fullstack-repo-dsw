import { Routes, Route } from 'react-router-dom'
import App from '../App'
import { Home } from '../pages/Home'
import { Acess } from '../pages/Acess'
import { Dashboard } from '../pages/AdminDashboard/Dashboard'
import { IngresarVehiculo } from '../pages/AdminDashboard/IngresarVehiculo'
import { Reportes } from '../pages/AdminDashboard/Reportes'
import { Layout } from '../components/layout/Layout'
export const MyRouter = () => {
  return (
    <Routes>
      <Route index element={<Home/>} />
      <Route path="about" element={<App/>} />
      <Route path='login' element={<Acess/>} />
      <Route path='register' element={<App/>} />
      {/* <Route path='admin' element={<AdminDashboard/>} />
      <Route path='client' element={<ClientDashboard/>} /> */}
    
 {/* Admin con rutas anidadas */}
      <Route path="admin" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="alta-cliente" element={<IngresarVehiculo />} />
        <Route path="reportes" element={<Reportes />} />
      </Route>
    </Routes>

)
}
