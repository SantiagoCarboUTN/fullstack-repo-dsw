import { Default_Link } from '../../ui/default_link'
import brand_logo from '../../../assets/brand_logo.svg'

export const Navbar = () => {
  return (
    <nav className='w-full bg-white border-b border-borderColor py-0'>
    <div  className="flex justify-center items-center gap-7  text-xl">

        <Default_Link route='/'  isImg={true} imgSrc = {brand_logo}/>
        <Default_Link route="/login" text="Iniciar sesión" />
        <Default_Link route="/admin" text="Ingresar como administrador" /> {/* --> despues llevara a login del admin */}
    </div>
    </nav>
    
  )
}