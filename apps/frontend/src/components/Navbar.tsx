import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 
    py-4 text-gray-600 border-b border-borderColor relative transition-all`}>

      {/* Logo a la izquierda */}
      <div>
        <Link to="/">
          <p>MyGarage</p>
        </Link>
      </div>

      {/* Links a la derecha */}
      <div className='max-sm:fixed max-sm:h-screen max-sm:w-full 
      max-sm:top-16 max-sm:border-t border-borderColor right-0 flex flex-col 
      sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4'>

        <Link to="/" className="hover:text-black hover:scale-105 transform transition duration-200">Home</Link>
        <Link to="/reservas" className="hover:text-black hover:scale-105 transform transition duration-200">Reservar cochera</Link>
        <Link to="/pago" className="hover:text-black hover:scale-105 transform transition duration-200">Realizar pago</Link>
        <Link to="/logIn" className="hover:text-black hover:scale-105 transform transition duration-200">Iniciar Sesión</Link>
        <Link to="/singUp" className="hover:text-black hover:scale-105 transform transition duration-200">Registrarse</Link>
      </div>

    </div>
  )
}

export default Navbar