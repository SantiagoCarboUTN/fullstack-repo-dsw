
import { useState } from "react";
import type { Vehiculo, VehiculoForm } from "../../types/VehiculoType.tsx";
import { createVehiculo } from "../../services/VehiculoService.tsx";

export const useCreateVehiculo = () => {
  const [vehiculo, setVehiculo] = useState<Vehiculo>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [patente, setPatente] = useState<string>("");
  const [modelo, setModelo] = useState<string>("");
  const [clientId, setClientId] = useState<string>("");
  const [tipoVehiculoId, setTipoVehiculo] = useState<string>("");
  
  const handleClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientId(e.target.value)
  }

  const handlePatenteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatente(e.target.value)
  }

  const handleModeloChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModelo(e.target.value)
  }
  const handleTipoVehiculoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTipoVehiculo(e.target.value)
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const client = Number(clientId)
    const tipoVehiculo = Number(tipoVehiculoId)
    const vehiculoData: VehiculoForm = { patente, modelo, client, tipoVehiculo };
    try {
      const res = await createVehiculo(vehiculoData)
      setVehiculo(res);

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err)); 
      }
    } finally {
      setLoading(false);
    }
    
    
  };
 

  return { handleSubmit,
    handleClientChange, clientId,
    handleModeloChange, modelo,
    handlePatenteChange, patente,
    handleTipoVehiculoChange, tipoVehiculoId
    , vehiculo, loading, error };
};