import { useState } from "react";
import { Link } from "react-router-dom";
import { SubmitButton } from "../components/ui/SubmitButton";
import { FiUser, FiMail, FiLock, FiHome, FiBriefcase, FiImage } from "react-icons/fi";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    complete_name: "",
    email: "",
    password: "",
    imageUrl: "",
    razonSocial: "",
    direction: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulario enviado", formData);
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-400 via-blue-400 to-blue-700 p-4'>
      <div className='bg-white rounded-3xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden'>
        {/* Lado izquierdo */}
        <div className='w-full md:w-1/2 bg-blue-500 flex flex-col items-center justify-center text-white p-8 md:p-10 rounded-b-[50px] md:rounded-r-[100px] md:rounded-bl-none mb-6 md:mb-0'>
          <h2 className='text-3xl font-bold mb-4 text-center'>¡Únete a nuestra plataforma!</h2>
          <p className='mb-6 text-center'>Crea tu cuenta de administrador y registra tu sucursal</p>
          <div className="mt-6 text-center">
            <p className="mb-3">¿Ya sos cliente?</p>
            <Link to="/login" className='border border-white px-6 py-2 rounded-lg hover:bg-white hover:text-blue-500 transition-colors duration-300'>
              Iniciar sesión
            </Link>
          </div>
        </div>

        {/* Lado derecho */}
        <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-10'>
          <h2 className='text-2xl font-bold mb-6'>Registro</h2>
          <form className='flex flex-col gap-4 w-full max-w-sm' onSubmit={handleSubmit}>

            {/* Datos del Admin */}
            <div className='flex items-center border border-gray-300 rounded-lg px-3'>
              <FiUser className="w-5 h-5 mr-2 text-gray-400"/>
              <input type="text" name="complete_name" placeholder='Nombre completo' value={formData.complete_name} onChange={handleChange} required className='w-full p-2 rounded-lg focus:outline-none' />
            </div>

            <div className='flex items-center border border-gray-300 rounded-lg px-3'>
              <FiMail className="w-5 h-5 mr-2 text-gray-400"/>
              <input type="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange} required className='w-full p-2 rounded-lg focus:outline-none' />
            </div>

            <div className='flex items-center border border-gray-300 rounded-lg px-3'>
              <FiLock className="w-5 h-5 mr-2 text-gray-400"/>
              <input type="password" name="password" placeholder='Contraseña' value={formData.password} onChange={handleChange} required className='w-full p-2 rounded-lg focus:outline-none' />
            </div>

            {/* Datos de la Sucursal */}
            <div className='border border-gray-300 rounded-lg p-4 mt-4'>
              <h3 className='font-semibold mb-2'>Datos de la Sucursal</h3>

              <div className='flex items-center border border-gray-300 rounded-lg px-3 mb-2'>
                <FiBriefcase className="w-5 h-5 mr-2 text-gray-400"/>
                <input type="text" name="razonSocial" placeholder='Nombre de la sucursal' value={formData.razonSocial} onChange={handleChange} required className='w-full p-2 rounded-lg focus:outline-none' />
              </div>

              <div className='flex items-center border border-gray-300 rounded-lg px-3 mb-2'>
                <FiHome className="w-5 h-5 mr-2 text-gray-400"/>
                <input type="text" name="direction" placeholder='Dirección' value={formData.direction} onChange={handleChange} required className='w-full p-2 rounded-lg focus:outline-none' />
              </div>

              <div className='flex items-center border border-gray-300 rounded-lg px-3'>
                <FiImage className="w-5 h-5 mr-2 text-gray-400"/>
                <input type="text" name="imageUrl" placeholder='URL de imagen' value={formData.imageUrl} onChange={handleChange} required className='w-full p-2 rounded-lg focus:outline-none' />
              </div>
            </div>

            <SubmitButton text="Registrarse" className="mt-4" />
          </form>
        </div>
      </div>
    </div>
  );
};
