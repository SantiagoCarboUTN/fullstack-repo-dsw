import {  BiCar } from "react-icons/bi"
import { SideBarLink } from "./SideBarLink"
import { TfiReceipt } from "react-icons/tfi";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
export const SideBarClient = ({ user }: { user: { nombre: string}}) => {
  const links = [
    { to: "/client/mis-reservas", label: "Mis reservas", icon: BiCar },
    { to: "/client/mis-pagos", label: "Pagos", icon: TfiReceipt }
  ]

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h2 className="text-3xl font-bold mb-6">MyGarage</h2>
        <nav className="text-lg">
          {links.map((link) => (
            <SideBarLink
              key={link.to}
              to={link.to}
              label={link.label}
              icon={link.icon}
            />
          ))}
        </nav>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-gray-700 pt-4 text-lg">
        <div className="flex items-center mb-5 ml-3">
          <FaUserCircle size={30}  className="text-gray-400 mr-2"/>
          <div>
            <p className="font-semibold ">{user.nombre}</p>
            <p className="text-sm text-gray-400">Cliente</p>
          </div>
        </div>

        <button
          className="flex items-center  text-gray-400 hover:text-red-500 transition-colors ml-3"
          onClick={() => console.log("Cerrar sesión")}
        >
          <FaSignOutAlt className="mr-2 text-red-500 opacity-75" />
          Cerrar sesión
        </button>
      </footer>
    </div>
  )
}