import { Routes, Route } from 'react-router-dom'
import App from '../App'
import { Home } from '../pages/Home'
import { Access } from '../pages/Access.tsx'
import { RealizarReserva } from '../pages/AdminDashboard/RealizarReserva.tsx'
import { Reportes } from '../pages/AdminDashboard/Reportes'
import { LayoutAdmin } from '../components/layout/LayoutAdmin.tsx'
import { AltaCliente } from '../pages/AdminDashboard/AltaCliente'
import { CocherasList } from '../pages/AdminDashboard/CocherasList.tsx'
import { AltaCochera } from '../pages/AdminDashboard/AltaCochera.tsx'
import { AgregarTipoVehiculo } from '../pages/AdminDashboard/AgregarTipoVehiculo.tsx'
import { ReservasList } from '../pages/ClientDashboard/reservasList.tsx'
import { LayoutClient } from '../components/layout/LayoutClient.tsx'
import { VerReserva } from '../pages/ClientDashboard/verReserva.tsx'
import {SignUp} from '../pages/SignUp.tsx'
import { Altavehiculo } from '../pages/AdminDashboard/AltaVehiculo.tsx'
import { PagosList } from '../pages/ClientDashboard/pagosList.tsx'
import { ClientList } from '../pages/AdminDashboard/ClientList.tsx'
import { EditClient } from '../pages/AdminDashboard/EditarCliente.tsx'
import { MisServicios } from '../pages/AdminDashboard/MisServicios.tsx'
import { EditService } from '../pages/AdminDashboard/EditarServicio.tsx'
import { AltaTipoServicio } from '../pages/AdminDashboard/AgregarTipoServicio.tsx'
import { ReservasAdminList } from '../pages/AdminDashboard/ReservasList.tsx'

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
        <Route path="dashboard" element={<ReservasAdminList />} />
        <Route path="realizar-reserva" element={<RealizarReserva />} />
        <Route path="/admin/realizar-reserva/:number" element={<RealizarReserva />} />
        <Route path="reportes" element={<Reportes />} />
        <Route path="cocheras" element={<CocherasList />} />
        <Route path="alta-cliente" element={<AltaCliente />} />
        <Route path="alta-cochera" element={<AltaCochera />} />
        <Route path="alta-vehiculo" element={<Altavehiculo />} />
        <Route path="clients" element={< ClientList/>} />
        <Route path="mis-servicios" element={< MisServicios/>} />
        <Route path="editar-cliente/:id" element={< EditClient/>} />
        <Route path="agregar-tipo-vehiculo" element={<AgregarTipoVehiculo />} />
        <Route path="alta-servicio" element={<AltaTipoServicio />} />
        <Route path="editar-servicio/:id" element={<EditService />} />
      </Route>

      <Route path="client" element={<LayoutClient />}>
        <Route path="mis-reservas" element={<ReservasList />} />
        <Route path="/client/ver-reserva/:admin/:number/:vehiculo/:fechaInicio/" element={<VerReserva />} />
        <Route path="mis-pagos" element={<PagosList />} />
      </Route>
        
    </Routes>

)
}
