import { Routes, Route } from 'react-router-dom'
import App from '../App'
import { Home } from '../pages/Home'
import { Access } from '../pages/Access.tsx'
import { Dashboard } from '../pages/AdminDashboard/Dashboard'
import { RealizarReserva } from '../pages/AdminDashboard/RealizarReserva.tsx'
import { Reportes } from '../pages/AdminDashboard/Reportes'
import { LayoutAdmin } from '../components/layout/LayoutAdmin'
import { AltaCliente } from '../pages/AdminDashboard/AltaCliente'
import { CocherasList } from '../pages/AdminDashboard/CocherasList.tsx'
import { AltaCochera } from '../pages/AdminDashboard/AltaCochera.tsx'
import { AgregarTipoVehiculo } from '../pages/AdminDashboard/AgregarTipoVehiculo.tsx'
import { ReservasList } from '../pages/ClientDashboard/reservasList.tsx'
import { LayoutClient } from '../components/layout/LayoutClient.tsx'
import { VerReserva } from '../pages/ClientDashboard/verReserva.tsx'
import {SignUp} from '../pages/SignUp.tsx'

export const MyRouter = () => {
  return (
    <Routes>
      <Route index element={<Home/>} />
      <Route path="about" element={<App/>} />
      <Route path='login' element={<Access/>} />
      <Route path='register' element={<App/>} />
      <Route path='sign-up' element={<SignUp/>} />
 {/* Admin con rutas anidadas */}
      <Route path="admin" element={<LayoutAdmin />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="realizar-reserva" element={<RealizarReserva />} />
        <Route path="/admin/realizar-reserva/:number" element={<RealizarReserva />} />
        <Route path="reportes" element={<Reportes />} />
        <Route path="cocheras" element={<CocherasList />} />
        <Route path="alta-cliente" element={<AltaCliente />} />
        <Route path="alta-cochera" element={<AltaCochera />} />
        <Route path="agregar-tipo-vehiculo" element={<AgregarTipoVehiculo />} />
      </Route>

      <Route path="client" element={<LayoutClient />}>
        <Route path="mis-reservas" element={<ReservasList />} />
        <Route path="/client/ver-reserva/:admin/:number/:vehiculo/:fechaInicio/" element={<VerReserva />} />
      </Route>
      
    </Routes>

)
}
