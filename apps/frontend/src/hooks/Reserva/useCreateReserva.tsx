import { useState } from "react";
import type { Reserva } from "../../types/ReservaType.tsx";
import type { ReservaInput } from "../../types/ReservaType.tsx";
import { createReserva } from "../../services/ReservaService.tsx";




export const useCreateReserva = (number?:string) => {
  const [loading, setLoading] = useState(false);
  const hoy = new Date().toISOString().split("T")[0];
  const [error, setError] = useState<string | null>(null);
  const [reserva, setReserva] = useState<Reserva | null>(null);
  const [vehiculo, setVehiculo] = useState("");
  
  const [cocheraId, setCocheraId] = useState(number || "");
  const [clienteDni, setClienteDni] = useState("");
  const [tipoServicio, setTipoServicio] = useState("");
  const [fechaInicio, setFechaInicio] = useState(hoy);

  
  const handleCocheraChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCocheraId(e.target.value)
  }

  const handleVehiculoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVehiculo(e.target.value)
  }

  const handleTipoServicioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTipoServicio(e.target.value)
  }

  const handleDniChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClienteDni(e.target.value)
  }
  const handleFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFechaInicio(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      setReserva(null);
      const fechaInicioDate = new Date(fechaInicio); // convierte string a Date

      const nuevaReserva: ReservaInput = {
        vehiculo: String(vehiculo),
        clienteDni: Number.parseInt(clienteDni),
        cochera: {
          number:Number.parseInt(cocheraId),
          admin: 1
        },
        tipoServicio: Number.parseInt(tipoServicio),
        fechaInicio: fechaInicioDate,
        
      };
      try{
        const res = await createReserva(nuevaReserva)
        setReserva(res);

      }catch(err:unknown){
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err)); 
        }
      }finally {
        setLoading(false);
      }
      
    };
    
  

  return { handleSubmit,
    handleDniChange,clienteDni,
    handleCocheraChange, cocheraId,
    handleFechaChange, fechaInicio,
    handleTipoServicioChange, tipoServicio,
    handleVehiculoChange, vehiculo,
     loading, error, reserva };
}