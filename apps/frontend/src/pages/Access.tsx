import { Link } from "react-router-dom";
import { SubmitButton } from "../components/ui/SubmitButton";
import { FiUser, FiLock } from "react-icons/fi";

export const Access = () => {
  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-400 via-blue-400 to-blue-700 p-4'>
      <div className='bg-white rounded-3xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden'>

        {/* Lado izquierdo */}
        <div className='w-full md:w-1/2 bg-blue-500 flex flex-col items-center justify-center text-white p-10 rounded-b-[50px] md:rounded-r-[100px] md:rounded-bl-none mb-6 md:mb-0'>
          <h2 className='text-3xl font-bold mb-4 text-center'>¡Hola, Bienvenido!</h2>
          <p className='mb-6 text-center'>¿Querés registrar tu cochera?</p>
          <div className="w-3/4 md:w-2/3 flex justify-center">
            <Link to="/sign-up" className='border border-white px-6 py-2 rounded-lg hover:bg-white hover:text-blue-500 transition-colors duration-300'>
              Registrar Cochera
            </Link>
          </div>
        </div>

        {/* Lado derecho */}
        <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-10'>
          <h2 className='text-2xl font-bold mb-6'>Iniciar Sesión</h2>
          <form className='flex flex-col gap-5 w-full max-w-sm'>

            <div className='flex items-center border border-gray-300 rounded-lg px-3 h-12'>
              <FiUser className="w-5 h-5 mr-2 text-gray-400" />
              <input 
                type="text" 
                placeholder='Usuario' 
                required 
                className='w-full h-full p-2 rounded-lg focus:outline-none' 
              />
            </div>

            <div className='flex items-center border border-gray-300 rounded-lg px-3 h-12'>
              <FiLock className="w-5 h-5 mr-2 text-gray-400" />
              <input 
                type="password" 
                placeholder='Contraseña' 
                required 
                className='w-full h-full p-2 rounded-lg focus:outline-none' 
              />
            </div>

            <a href="#" className='text-sm text-blue-600 hover:underline text-right'>¿Olvidaste tu contraseña?</a>

            <SubmitButton text="Ingresar" className="mt-2 w-full py-3 bg-blue-600 text-white hover:bg-blue-700" />
          </form>
        </div>
      </div>
    </div>
  );
};
