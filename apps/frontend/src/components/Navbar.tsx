import { Default_Link } from "./default_link"

export const Navbar = () => {
  return (
    <div  className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 
    py-4 text-gray-600 border-b border-borderColor relative transition-all max-sm:fixed max-sm:h-screen max-sm:w-full 
      max-sm:top-16 max-sm:border-t border-borderColor right-0 flex flex-col 
      sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4`}>

        <Default_Link route="/" text="Home" />
        <Default_Link route="/reservas" text="Reservar cochera" />
        <Default_Link route="/pago" text="Realizar pago" />
        <Default_Link route="/singUp" text="Registrarse" />
        <Default_Link route="/login" text="Iniciar Sesión" />
    </div>
    
  )
}