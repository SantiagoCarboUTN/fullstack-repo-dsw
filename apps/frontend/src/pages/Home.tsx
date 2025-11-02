import { Navbar } from "../components/layout/NavBar/Navbar";
import "../index.css";
import fotolandingpage from "../assets/sin_fondo.png";
import { Small_Card } from "../components/ui/Small_Card";
import { useSucursales } from "../hooks/Sucursal/UseSucursal";
import { assets } from "../assets/index";
import { NavigateButton } from "../components/ui/NavigateButton";

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const SmallCardInfo = [
  { text: "Gestiona Reservas", imgSrc: assets.calendar },
  { text: "Historial de Reservas", imgSrc: assets.history },
  { text: "Facturación y Pagos Automáticos", imgSrc: assets.invoices },
  { text: "Reportes Automáticos", imgSrc: assets.purchase_orders },
  { text: "Recordatorios de Pagos a Clientes", imgSrc: assets.reminders },
  { text: "Para Todos los Tipos De Vehículo", imgSrc: assets.repair_jobs },
  { text: "Gestión Personalizada", imgSrc: assets.stock_control },
  { text: "Registro de Clientes", imgSrc: assets.team },
  { text: "Búsqueda por Patente", imgSrc: assets.vin_lookup },
];

export const Home = () => {
  const { sucursales, loading, error } = useSucursales();

  return (
    <>
      <Navbar />
            {/* HERO */}
      <section className="bg-gray-200 flex flex-col-reverse md:flex-row items-center justify-center py-16 md:py-24 px-6 md:px-20 text-center md:text-left">
        {/* Texto */}
        <div className="flex flex-col items-center md:items-start gap-6 w-full md:w-1/2">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-blue-600 leading-tight">
            Administrador de cocheras
          </h1>

          <h2 className="text-xl sm:text-2xl text-blue-500 italic font-semibold">
            Optimiza tu negocio al máximo
          </h2>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mt-4 w-full sm:w-auto">
            <NavigateButton label="Registrar mi cochera" to="/sign-up" />
            <NavigateButton label="Iniciar sesión" to="/login" />
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center md:justify-end w-full md:w-1/2 mb-10 md:mb-0">
          <img
            src={fotolandingpage}
            alt="estacionamiento"
            className="max-w-[300px] sm:max-w-[400px] md:max-w-[480px] w-full h-auto transition-transform duration-300 hover:scale-105 animate-slide-in-right"
          />
        </div>
      </section>


      {/* Descripcion */}
      <section className="bg-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-blue-600 mb-6">
            Simplifica y potencia la gestión de tu cochera
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Con nuestra plataforma podrás <span className="font-semibold text-blue-600">automatizar tus procesos</span>, 
            controlar reservas en tiempo real, administrar clientes y obtener 
            reportes detallados sin complicaciones.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Todo desde un entorno intuitivo, accesible y pensado para 
            <span className="font-semibold text-blue-600"> maximizar la eficiencia de tu negocio</span>.  
            Olvídate del papeleo y lleva tu administración al siguiente nivel.
          </p>
        </div>
      </section>

      {/* Servicios en alta demanda */}
      <section className="bg-gray-200 py-12">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 text-blue-600">
          Servicios en alta demanda
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-6">
          {SmallCardInfo.map((card, index) => (
            <Small_Card key={index} text={card.text} imgSrc={card.imgSrc} />
          ))}
        </div>
      </section>

      {/* Sucursales */}
      <section className="py-16">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 text-blue-600">
          Sucursales adheridas
        </h2>
        {loading ? (
          <p className="p-4 text-center text-gray-600">Cargando sucursales...</p>
        ) : error ? (
          <p className="p-4 text-center text-red-500">Error: {error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-6">
            {sucursales.map((suc, index) => (
              <Small_Card
                key={index}
                text={suc.razonSocial}
                imgSrc={suc.imageUrl}
              />
            ))}
          </div>
        )}
      </section>

    {/* Footer */}
    <footer className="bg-blue-900 text-white mt-0">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
        {/* Logo */}
        <div>
          <h3 className="text-2xl font-bold mb-3">AdminCocheras</h3>
          <p className="text-gray-300 text-sm">
            Simplifica la gestión de tus cocheras con una plataforma moderna,
            rápida y eficiente.
          </p>
        </div>

        {/* Navegación */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Navegación</h4>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/" className="hover:text-white">Inicio</a></li>
            <li><a href="/login" className="hover:text-white">Iniciar sesión</a></li>
            <li><a href="/sign-up" className="hover:text-white">Registrarse</a></li>
            <li><a href="/contacto" className="hover:text-white">Contacto</a></li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Contacto</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-center justify-center md:justify-start gap-2">
              <MdEmail /> contacto@admincocheras.com
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <MdPhone /> +54 9 341 555 1234
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <MdLocationOn /> Rosario, Argentina
            </li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Síguenos</h4>
          <div className="flex justify-center md:justify-start gap-4">
            <a href="#" className="hover:text-blue-400"><FaFacebook size={22} /></a>
            <a href="#" className="hover:text-pink-400"><FaInstagram size={22} /></a>
            <a href="#" className="hover:text-sky-400"><FaTwitter size={22} /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-blue-700 text-center py-4 text-gray-300 text-sm">
        © {new Date().getFullYear()} AdminCocheras — Todos los derechos reservados.
      </div>
    </footer>
    </>
  );
} 
