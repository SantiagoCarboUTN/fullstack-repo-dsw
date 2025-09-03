import { Default_Link } from "./default_link"
import brand_logo from '../assets/brand_logo.svg'

export const Navbar = () => {
  return (
    <nav className='"w-full bg-white border-b border-borderColor py-0'>
    <div  className="flex justify-center items-center gap-7  text-xl">

        <Default_Link route='/'  isImg={true} imgSrc = {brand_logo}/>
        <Default_Link route="/" text="Home" />
        <Default_Link route="/reservas" text="Reservar cochera" />
        <Default_Link route="/pago" text="Realizar pago" />
        <Default_Link route="/singUp" text="Registrarse" />
        <Default_Link route="/login" text="Iniciar Sesión" />
    </div>
    </nav>
    
  )
}