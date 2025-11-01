import React from "react";
import { Link } from "react-router-dom";
import { BiHomeAlt, BiCar, BiBarChart } from "react-icons/bi";
import { FaParking, FaUserCheck, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { GiGearStickPattern } from "react-icons/gi";
import type { Admin } from "../../../types/AdminType.tsx";

interface SideBarAdminProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  admin?:Admin 
}

export const SideBarAdmin = ({ isOpen, setIsOpen, admin }:SideBarAdminProps) => {
  const links = [
    { to: "/admin/dashboard", label: "Dashboard", icon: <BiHomeAlt /> },
    { to: "/admin/alta-vehiculo", label: "Vehículos", icon: <BiCar /> },
    { to: "/admin/reportes", label: "Reportes", icon: <BiBarChart /> },
    { to: "/admin/clients", label: "Clientes", icon: <FaUserCheck /> },
    { to: "/admin/cocheras", label: "Administrar Cocheras", icon: <FaParking /> },
    { to: "/admin/agregar-tipo-vehiculo", label: "Tipos Vehículo", icon: <GiGearStickPattern /> },
  ];

  return (
    <aside
      className={`
        fixed md:static z-40 top-0 left-0 h-full w-72 bg-gray-800 text-white
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 flex flex-col justify-between p-4
      `}
    >
      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-bold mb-6">MyGarage</h2>
        <nav className="text-lg">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-2 mb-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition"
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-gray-700 pt-4 text-lg">
        <div className="flex items-center mb-5 ml-3">
          <FaUserCircle size={30} className="text-gray-400 mr-2" />
          <div>
            <p className="font-semibold">{admin?.complete_name || "Error al cargar el usuario"}</p>
            <p className="text-sm text-gray-400">Administrador</p>
          </div>
        </div>

        <button
          className="flex items-center text-gray-400 hover:text-red-500 transition-colors ml-3"
          onClick={() => console.log("Cerrar sesión")}
        >
          <FaSignOutAlt className="mr-2 text-red-500 opacity-75" />
          Cerrar sesión
        </button>
      </footer>
    </aside>
  );
};
