
import {Navbar} from '../components/Navbar'
import '../index.css'
import {Card} from '../components/Card'
import main_foto from '../assets/main_foto.png'
import { Small_Card } from '../components/Small_Card'
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
  return (
    <>
      <Navbar/>
      
      
      
      <div className='flex flex-col items-center p-6 
      space-y-6 text-2xl max-w-6-xl text center bg-gray-200 '>
        <div className='flex flex-row items-start justify-center gap-20 w-full '>
        <div className=' mt-20'>
          <h1 className='text-5xl font-bold text-left my-8'>Administrador de cocheras</h1>
          <h2 className='animate-slide-in-left max-w-2xl text-left'>Optimiza tu negocio al máximo</h2>
        </div>
        <img src={main_foto} alt="estacionamiento" className='animate-slide-in-right w-100 h-100 rounded-full shadow-lg transition-transform object-cover duration-300 hover:scale-105 bg-blue-200'/>
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
        <h2 className='text-5xl font-bold text-center mb-10'>Top features</h2>
        <div className='grid grid-cols-3 gap-5 max-w-7xl mx-auto p-5 justify-center'>
          {SmallCardInfo.map((card, index) => (
            <Small_Card key={index} text={card.text} imgSrc={card.imgSrc} />
          ))}
        </div>
      </div>
    </>
  )
}
