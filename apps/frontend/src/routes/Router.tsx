import { Routes, Route } from 'react-router-dom'
import App from '../App'
import { Home } from '../pages/Home'
import { Acess } from '../pages/Acess'
import { Dashboard } from '../pages/AdminDashboard/Dashboard'
import { IngresarVehiculo } from '../pages/AdminDashboard/IngresarVehiculo'
import { Reportes } from '../pages/AdminDashboard/Reportes'
import { LayoutAdmin } from '../components/layout/LayoutAdmin'
/* import { AgregarCochera } from '../pages/AdminDashboard/AgregarCochera' */
import { AltaCliente } from '../pages/AdminDashboard/AltaCliente'
import { CocherasList } from '../pages/AdminDashboard/CocherasList.tsx'
import { AltaCochera } from '../pages/AdminDashboard/AltaCochera.tsx'

export const MyRouter = () => {
  return (
    <Routes>
      <Route index element={<Home/>} />
      <Route path="about" element={<App/>} />
      <Route path='login' element={<Acess/>} />
      <Route path='register' element={<App/>} />
    
 {/* Admin con rutas anidadas */}
      <Route path="admin" element={<LayoutAdmin />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="realizar-reserva" element={<IngresarVehiculo />} />
        <Route path="reportes" element={<Reportes />} />
        {/* <Route path="agregar-cochera" element={<AgregarCochera />} /> */} {/* agregar cochera estaria en el listado */}
        <Route path="cocheras" element={<CocherasList />} />
        <Route path="alta-cliente" element={<AltaCliente />} />
        <Route path="alta-cochera" element={<AltaCochera />} />
      </Route>
    </Routes>

)
}
