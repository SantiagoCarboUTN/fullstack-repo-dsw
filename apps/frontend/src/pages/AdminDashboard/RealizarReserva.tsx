import { useState} from "react";
import { Default_Link } from "../../components/ui/default_link.tsx";
import { useCreateReserva } from "../../hooks/Reserva/useCreateReserva.tsx";
import type { ReservaInput } from "../../types/ReservaType.tsx";
import { SubmitButton } from "../../components/ui/SubmitButton.tsx";
import { useParams } from "react-router-dom";

export const RealizarReserva = () => {
  const hoy = new Date().toISOString().split("T")[0];
  const { createReserva, loading, error, reserva } = useCreateReserva();
  const [vehiculo, setVehiculo] = useState("");
  const {number} = useParams<{number?:string}>()
  const [cocheraId, setCocheraId] = useState(number || "");
  const [clienteDni, setClienteDni] = useState("");
  const [tipoServicio, setTipoServicio] = useState("");
  const [fechaInicio, setFechaInicio] = useState(hoy);
  

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const fechaInicioDate = new Date(fechaInicio); // convierte string a Date
  const fechaFin = new Date(fechaInicioDate);

  switch (tipoServicio) {
    case "trimestral":
    case "3":
      fechaFin.setMonth(fechaFin.getMonth() + 3);
      break;
    case "mensual":
    case "2":
      fechaFin.setMonth(fechaFin.getMonth() + 1);
      break;
    case "anual":
    case "1":
      fechaFin.setFullYear(fechaFin.getFullYear() + 1);
      break;
    default:
      throw new Error("Tipo de servicio desconocido");
  }

  const nuevaReserva: ReservaInput = {
    vehiculo: String(vehiculo),
    clienteDni: Number.parseInt(clienteDni),
    cochera: {
      number:Number.parseInt(cocheraId),
      admin: 1
    },
    tipoServicio: Number.parseInt(tipoServicio),
    fechaInicio: fechaInicioDate,
    fechaFin,
  };

  await createReserva(nuevaReserva);
};



  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-md w-full max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-blue-700 text-center">
          Realizar Reserva  
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* vehiculo */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              Vehículo
            </label>
            <input
              type="text"
              name="patente"
              placeholder="Ej: ABC123"
              required
              value={vehiculo}
              onChange={(e) => setVehiculo(e.target.value)}
              className="border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          {/* Número de cochera */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              Número de Cochera
            </label>
            <input
              className="no-spinner border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              required
              type="number"
              onWheel={(e) => e.currentTarget.blur()} 
              onKeyDown={(e) => {
              if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
            }}
              value={cocheraId}
              onChange={(e) => setCocheraId(e.target.value)}
            ></input>
            
          </div>

          {/* Cliente dni */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              DNI del cliente
            </label>
            <input 
            type="number"
            onWheel={(e) => e.currentTarget.blur()} 
            onKeyDown={(e) => {
              if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
            }}
              placeholder="Ej: 12345678"
              required
              value={clienteDni}
              onChange={(e) => setClienteDni(e.target.value)}
            className="no-spinner border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            />

            <p className="mt-2 text-blue-700 hover:underline cursor-pointer text-base">
              <Default_Link route="/admin/alta-cliente" text="Registrar nuevo cliente" />
            </p>
          </div>

          {/* Tipo de servicio */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              Tipo de Servicio
            </label>
            <div className=" flex gap-4">
            {[1, 2, 3].map((servicio) => (
              <label
                key={servicio}
                className="flex items-center border border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-700 transition-colors"
              >
                <input
                  type="radio"
                  name="tipoServicio"
                  value={servicio}
                  required
                  onChange={(e) => setTipoServicio(e.target.value)}
                  className="mr-3 accent-blue-700"
                />
                <span className="text-lg text-gray-700 font-medium">{servicio}</span>
              </label>
            ))}
  </div>
          </div>

          {/* Fecha de inicio */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              Fecha de Inicio
            </label>
            <input
              type="date"
              defaultValue={hoy}
              required
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          {/* Botón */}
          <div className="text-center">
            <SubmitButton
              text="Crear Reserva"
              loadingText="Guardando..."
              loading={loading}
                        />
          </div>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          {reserva && <p className="text-green-500 text-center mt-4">Reserva creada con éxito</p>}
        </form>
      </div>
    </div>
  );
};
