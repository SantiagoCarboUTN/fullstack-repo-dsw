import { BiHomeAlt, BiCar, BiBarChart } from "react-icons/bi"
import { SideBarLink } from "./SideBarLink"

export const SideBarAdmin = () => {
  const links = [
    { to: "/admin/dashboard", label: "Dashboard", icon: BiHomeAlt },
    { to: "/admin/alta-cliente", label: "Realizar reserva", icon: BiCar },
    { to: "/admin/reportes", label: "Reportes", icon: BiBarChart },
  ]
  {/* Agregar Cochera, Listar Cocheras con tipo Vehiculo, Modificar Realizar Reserva*/}

  return (
    <aside className="w-80 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Bienvenido FELI BUMBASKI</h2>
      <nav>
        {links.map((link) => (
          <SideBarLink
            key={link.to}
            to={link.to}
            label={link.label}
            icon={link.icon}
          />
        ))}
      </nav>
    </aside>
  )
}