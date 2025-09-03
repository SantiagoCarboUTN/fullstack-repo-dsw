import estacionamiento from '../assets/estacionamiento.png'
import {Navbar} from '../components/Navbar'


export const Home = () => {
  return (
    <>
    <Navbar/>
    <h1 className='text-5xl font-bold text-center my-8'>Administra tu cochera como nuna antes</h1>
    
    <div className='flex flex-col items-center p-6 space-y-6 text-2xl'>
    <div className='flex flex-row items-center justify-center gap-10 w-full max-w-9xl mx-auto'>
    <p className='max-w-5xl text-center'>Bienvenido a nuestra aplicación de gestión de cocheras, diseñada para simplificar la administración y optimizar el uso de tus espacios de estacionamiento. Ya sea que manejes un pequeño lote o una gran instalación, nuestra plataforma te ofrece las herramientas necesarias para gestionar reservas, pagos y disponibilidad de manera eficiente y sin complicaciones.</p>
    
    <img src={estacionamiento} alt="estacionamiento" className='"w-96 max-w-xs md:max-w-md rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"'/>
    
    </div>

    <p className='max-w-2xl mx-auto text-center'>Con una interfaz intuitiva y funcionalidades avanzadas, podrás monitorear en tiempo real el estado de tus cocheras, gestionar usuarios y generar reportes detallados. Olvídate del papeleo y las confusiones; nuestra aplicación está aquí para hacer tu vida más fácil y tu negocio más rentable.</p>
    
    <p className='max-w-2xl mx-auto text-center'>Únete a nosotros y descubre cómo nuestra solución puede transformar la manera en que gestionas tus cocheras, brindando una experiencia fluida tanto para ti como para tus clientes.</p>
    </div>
    </>
  )
}
