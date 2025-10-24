import { Navbar } from "../components/layout/NavBar/Navbar";
import "../index.css";
import { Card } from "../components/ui/Card";
import fotolandingpage from "../assets/sin_fondo.png";
import { Small_Card } from "../components/ui/Small_Card";
import { useSucursales } from "../hooks/Sucursal/UseSucursal";
import { assets } from "../assets/index";
import { NavigateButton } from "../components/ui/NavigateButton";

// 🔹 Íconos de React Icons
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

      {/* Sección principal */}
      <div className="h-auto bg-gray-200 flex items-center justify-center py-30">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full">
          <div className="flex flex-col items-right gap-3 text-right">
            <h1 className="mt-10 text-8xl font-extrabold text-blue-600">
              Administrador de cocheras
            </h1>
            <h2 className="mb-10 animate-slide-in-left text-blue-500 italic font-semibold text-2xl">
              Optimiza tu negocio al máximo
            </h2>

            <div>
              <NavigateButton label="Registrar mi cochera" to="/sign-up" />
              <NavigateButton label="Iniciar sesión" to="/login" />
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src={fotolandingpage}
              alt="estacionamiento"
              className="animate-slide-in-right transition-transform max-w-[500px] duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* Texto descriptivo */}
      <p className="max-w-2xl mx-auto text-center mt-10">
        Con una interfaz intuitiva y funcionalidades avanzadas, podrás
        monitorear en tiempo real el estado de tus cocheras, gestionar usuarios
        y generar reportes detallados. Olvídate del papeleo y las confusiones;
        nuestra aplicación está aquí para hacer tu vida más fácil y tu negocio
        más rentable.
      </p>

      <p className="max-w-2xl mx-auto text-center mt-4">
        Únete a nosotros y descubre cómo nuestra solución puede transformar la
        manera en que gestionas tus cocheras, brindando una experiencia fluida
        tanto para ti como para tus clientes.
      </p>

      {/* Tarjetas */}
      <div className="flex flex-row items-center gap-10 w-full max-w-9xl mx-auto p-6 justify-center text-2xl">
        <Card />
        <Card />
        <Card />
      </div>

      {/* Servicios */}
      <div className="bg-gray-200 box-border py-12 mt-20">
        <h2 className="text-5xl font-bold text-center mb-10 text-blue-600">
          Servicios en alta demanda
        </h2>
        <div className="grid grid-cols-3 gap-5 max-w-7xl mx-auto p-5 justify-center">
          {SmallCardInfo.map((card, index) => (
            <Small_Card key={index} text={card.text} imgSrc={card.imgSrc} />
          ))}
        </div>
      </div>

      {/* Sucursales */}
      <div className="bg-gray-200 box-border py-12 mt-20">
        <h2 className="text-5xl font-bold text-center mb-10 text-blue-600">
          Sucursales adheridas
        </h2>
        {loading ? (
          <p className="p-4">Cargando sucursales...</p>
        ) : error ? (
          <p className="p-4 text-red-500">Error: {error}</p>
        ) : (
          <div className="grid grid-cols-3 gap-5 max-w-7xl mx-auto p-5 justify-center">
            {sucursales.map((suc, index) => (
              <Small_Card
                key={index}
                text={suc.razonSocial}
                imgSrc={suc.imageUrl}
              />
            ))}
          </div>
        )}
      </div>

      {/* 🌐 Footer */}
      <footer className="bg-blue-800 text-white mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo / Descripción */}
          <div>
            <h3 className="text-3xl font-bold mb-4">MyGarage</h3>
            <p className="text-gray-300">
              Simplifica la gestión de tus cocheras con una plataforma moderna,
              rápida y eficiente.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="text-xl font-semibold mb-3">Navegación</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-white">Inicio</a></li>
              <li><a href="/login" className="hover:text-white">Iniciar sesión</a></li>
              <li><a href="/sign-up" className="hover:text-white">Registrarse</a></li>
              <li><a href="/contacto" className="hover:text-white">Contacto</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-xl font-semibold mb-3">Contacto</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-2"><MdEmail /> contacto@admincocheras.com</li>
              <li className="flex items-center gap-2"><MdPhone /> +54 9 341 555 1234</li>
              <li className="flex items-center gap-2"><MdLocationOn /> Rosario, Argentina</li>
            </ul>
          </div>

          {/* Redes sociales */}
          <div>
            <h4 className="text-xl font-semibold mb-3">Síguenos</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-400"><FaFacebook size={24} /></a>
              <a href="#" className="hover:text-pink-400"><FaInstagram size={24} /></a>
              <a href="#" className="hover:text-sky-400"><FaTwitter size={24} /></a>
            </div>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="border-t border-blue-700 text-center py-4 text-gray-300">
          © {new Date().getFullYear()} AdminCocheras — Todos los derechos reservados.
        </div>
      </footer>
    </>
  );
};
