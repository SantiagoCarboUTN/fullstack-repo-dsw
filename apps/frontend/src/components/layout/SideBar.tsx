import { Link, useLocation } from "react-router-dom"

export const Sidebar = () => {
  const { pathname } = useLocation()

  const linkClass = (path: string) =>
    `block px-4 py-2 rounded-md mb-2 ${
      pathname === path ? "bg-gray-700 text-white" : "hover:bg-gray-700 text-gray-200"
    }`

  return (
    <aside className="w-80 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Panel Admin</h2>
      <nav>
        <Link to="/admin/dashboard" className={linkClass("/admin/dashboard")}>
           Dashboard
        </Link>
        <Link to="/admin/alta-cliente" className={linkClass("/admin/alta-cliente")}>
           Ingresar Vehiculo
        </Link>
        <Link to="/admin/reportes" className={linkClass("/admin/reportes")}>
           Reportes
        </Link>
      </nav>
    </aside>
  )
}