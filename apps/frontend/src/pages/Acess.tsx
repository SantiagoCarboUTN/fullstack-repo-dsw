
import {person, lock} from '../assets/index'

export const Acess = () => {
  return (
    <>
      <div className='flex justify-center h-screen items-center bg-gradient-to-br from-indigo-400 via-blue-400 to-blue-700'>
  <div className='bg-white rounded-3xl shadow-2xl w-[900px] h-[500px] flex overflow-hidden'>

    {/* Lado izquierdo */}
    <div className='w-1/2 bg-blue-500 flex flex-col items-center justify-center text-white p-10 rounded-r-[100px]'>
      <h2 className='text-3xl font-bold mb-4'>¡Hola, Bienvenido!</h2>
      <p className='mb-6'>¿Queres registrar tu cochera?</p>
      <button className='border border-white px-6 py-2 rounded-lg hover:bg-white hover:text-blue-500 transition-colors duration-300'>
        Registrar mi cochera
      </button>
    </div>

    {/* Lado derecho */}
    <div className='w-1/2 flex flex-col justify-center items-center p-10'>
      <h2 className='text-2xl font-bold mb-6'>Iniciar Sesión</h2>
      <form className='flex flex-col gap-4 w-full max-w-sm'>
        <div className='flex items-center border border-gray-300 rounded-lg px-3'>
          <input 
            type="text" 
            placeholder='Usuario' 
            required 
            className='w-full p-2 rounded-lg focus:outline-none'
          />
          <img src={person} alt="person icon" className='w-5 h-5 ml-2'/>
        </div>
        <div className='flex items-center border border-gray-300 rounded-lg px-3'>
          <input 
            type="password" 
            placeholder='Contraseña' 
            required 
            className='w-full p-2 rounded-lg focus:outline-none'
          />
          <img src={lock} alt="lock icon" className='w-5 h-5 ml-2'/>
        </div>
        <a href="#" className='text-sm text-blue-600 hover:underline text-right'>¿Olvidaste tu contraseña?</a>
        <button 
          type='submit' 
          className='bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors duration-300'
        >
          Ingresar
        </button>
        <p className='text-sm text-gray-500 text-center'>o ingresa con</p>
        <div className='flex justify-center gap-4'>
          <button className='border p-2 rounded-lg'>G</button>
          <button className='border p-2 rounded-lg'>F</button>
          <button className='border p-2 rounded-lg'>GH</button>
          <button className='border p-2 rounded-lg'>IN</button>
        </div>
      </form>
    </div>
  </div>
</div>

    </>
  )
}
