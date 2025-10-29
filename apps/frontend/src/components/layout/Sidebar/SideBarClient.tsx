import { BiCar } from "react-icons/bi";
import { TfiReceipt } from "react-icons/tfi";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

interface SideBarClientProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SideBarClient = ({ isOpen, setIsOpen }:SideBarClientProps) => {
  const links = [
    { to: "/client/mis-reservas", label: "Mis reservas", icon: <BiCar /> },
    { to: "/client/mis-pagos", label: "Pagos", icon: <TfiReceipt /> },
  ];

  return (
    <aside
      className={`
        fixed md:static z-40 top-0 left-0 h-full w-72 bg-blue-800 text-white
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
              onClick={() => setIsOpen(false)} // cerrar menú al clickear en móvil
              className="flex items-center gap-3 p-2 mb-2 rounded-md text-gray-200 hover:bg-blue-700 hover:text-white transition"
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-blue-700 pt-4 text-lg">
        <div className="flex items-center mb-5 ml-3">
          <FaUserCircle size={30} className="text-gray-300 mr-2" />
          <div>
            <p className="font-semibold">Juan</p>
            <p className="text-sm text-gray-300">Cliente</p>
          </div>
        </div>

        <button
          className="flex items-center text-gray-300 hover:text-red-400 transition-colors ml-3"
          onClick={() => console.log("Cerrar sesión")}
        >
          <FaSignOutAlt className="mr-2 text-red-500 opacity-75" />
          Cerrar sesión
        </button>
      </footer>
    </aside>
  );
};
