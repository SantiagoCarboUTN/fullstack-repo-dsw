import { Navbar } from '../components/layout//NavBar/Navbar'
import '../index.css'
import {Card} from '../components/ui/Card'
import fotolandingpage from '../assets/sin_fondo.png'
import { Small_Card } from '../components/ui/Small_Card'
import { useSucursales } from '../hooks/Sucursal/UseSucursal.tsx'
import {assets} from '../assets/index'
const SmallCardInfo = [
        {text: 'Gestión de Calendario', imgSrc: assets.calendar},
        {text: 'Historial de Actividades', imgSrc: assets.history},
        {text: 'Facturación e Invoices', imgSrc: assets.invoices},
        {text: 'Órdenes de Compra', imgSrc: assets.purchase_orders},
        {text: 'Recordatorios Automáticos', imgSrc: assets.reminders},
        {text: 'Gestión de Trabajos de Reparación', imgSrc: assets.repair_jobs},
        {text: 'Control de Inventario', imgSrc: assets.stock_control},
        {text: 'Gestión de Equipo', imgSrc: assets.team},
        {text: 'Búsqueda por VIN', imgSrc: assets.vin_lookup},
      ]

export const Home = () => {
   const {sucursales, loading, error} = useSucursales()
  return (
    <>
    <Navbar/> 

      <div className='h-auto bg-gray-200 flex items-center justify-center py-30  '>

        <div className='grid grid-cols-1 md:grid-cols-2 items-center w-full'>
          
          <div className="flex flex-col items-right gap-3 text-right">

            <h1 className=' mt-10 text-8xl font-extrabold text-blue-600'>Administrador de cocheras</h1>
            <h2 className='mb-10 animate-slide-in-left text-blue-500 italic font-semibold text-2xl  '>Optimiza tu negocio al máximo</h2>
            
            <div>
              
                <button className=' animate-slide-in-bottom w-70 mt-5 self-end bg-blue-600 text-white  py-4 rounded-2xl  text-xl font-semibold hover:bg-blue-500 transition-colors duration-300  ml-5'>
                  Registrar mi cochera
                </button>
                <button className=' animate-slide-in-bottom w-70 border-box mt-5 self-end bg-blue-600 text-white  py-4 rounded-2xl  text-xl font-semibold hover:bg-blue-700 transition-colors duration-300 ml-5'>
                  Iniciar sesion
                </button>
            
            </div>

          </div>

            <div className="flex justify-center">

            <img src={fotolandingpage} alt="estacionamiento" className=' animate-slide-in-right transition-transform  max-w-[500px] duration-300 hover:scale-105'/>
            
            </div>

        </div>

      </div>


      <p className=' max-w-2xl mx-auto text-center'>Con una interfaz intuitiva y funcionalidades avanzadas, podrás monitorear en tiempo real el estado de tus cocheras, gestionar usuarios y generar reportes detallados. Olvídate del papeleo y las confusiones; nuestra aplicación está aquí para hacer tu vida más fácil y tu negocio más rentable.</p>
      
      <p className='max-w-2xl mx-auto text-center'>Únete a nosotros y descubre cómo nuestra solución puede transformar la manera en que gestionas tus cocheras, brindando una experiencia fluida tanto para ti como para tus clientes.</p>

      <div className='flex flex-row items-center gap-10 w-full max-w-9xl mx-auto p-6 justify-center text-2xl'>
        <Card/>
        <Card/>
        <Card/>
      </div>
      <div className='bg-gray-200 box-border py-12 mt-20'>
        <h2 className='text-5xl font-bold text-center mb-10 text-blue-600'>Servicios en alta demanda</h2>
        <div className='grid grid-cols-3 gap-5 max-w-7xl mx-auto p-5 justify-center'>
          {SmallCardInfo.map((card, index) => (
            <Small_Card key={index} text={card.text} imgSrc={card.imgSrc} />
          ))}
        </div>
      </div>
      <div className='bg-gray-200 box-border py-12 mt-20'>
        <h2 className='text-5xl font-bold text-center mb-10 text-blue-600'>Sucursales adheridas</h2>
        {loading ? (
            <p className="p-4">Cargando sucursales...</p>
          ) : error ? (
            <p className="p-4 text-red-500">Error: {error}</p>
          ) : (
          <div className='grid grid-cols-3 gap-5 max-w-7xl mx-auto p-5 justify-center'>
          {sucursales.map((suc, index) => (
            <Small_Card key={index} text={suc.razonSocial} imgSrc={suc.imageUrl} />
          ))}
        </div>)}
        
      </div>
    </>
  )
}
