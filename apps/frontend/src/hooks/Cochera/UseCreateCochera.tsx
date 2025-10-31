import { useState } from "react";
import type { CocheraForm } from "../../types/CocheraType.tsx"
import { createOneCochera } from "../../services/CocheraService.tsx";

export const useCreateCochera = ()=>{
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [tipoVehiculoId, setTipoVehiculoId] = useState("");
  const [numero, setNumero] = useState("");

  const handleTipoVehiculoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setTipoVehiculoId(e.target.value)
  }


  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumero(e.target.value)
  }


  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const nuevaCochera:CocheraForm = {
      tipoVehiculo: Number.parseInt(tipoVehiculoId),
      number:Number.parseInt(numero),
      admin:1,
      sucursal:1
      };
    setLoading(true)

    try{
      const res = await createOneCochera(nuevaCochera)

      setTipoVehiculoId("");
      setNumero("");
      setSuccessMessage(`Cochera creada con numero: ${res.number}`);
      
    }catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err)); // fallback si no es un Error
      }
    }finally {
      setLoading(false);
    }
  };
  
 return { numero,tipoVehiculoId, loading, error ,handleSubmit,handleNumberChange,handleTipoVehiculoChange,
  setSuccessMessage,successMessage};
}