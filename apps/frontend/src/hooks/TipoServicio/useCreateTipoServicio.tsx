import { useState } from "react";
import type { TipoServicioInput } from "../../types/TipoServicioType.tsx";
import { createTipoServicio } from "../../services/TipoServicioService.tsx";

export const useCreateTipoServicio= () => {
  const[loading, setLoading] = useState<boolean>(false );
  const [error, setError] = useState<string | null>(null)
  const [nombre, setNombre] = useState<string>("");
  const [precioCuota, setPrecioCuota] = useState<string>("");
  const [cantCuotas, setCantCuotas] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const adminId = 1 //para desarrollo
  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(e.target.value)
  }

  const handlePrecioCuotaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrecioCuota(e.target.value)
  }

  const handleCantCuotasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCantCuotas(e.target.value)
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const servicioData: TipoServicioInput = {  nombre, precioCuota, cantCuotas, admin:adminId };
    setLoading(true);
    setError("");
    setSuccessMessage(null);
  
    try {
      const res = await createTipoServicio(servicioData)
      setPrecioCuota("")
      setNombre("")
      setCantCuotas("")

      setSuccessMessage(`Servicio ${res.nombre} fue registrado con exito`);
    } catch (err: unknown) {
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
  handleNombreChange,nombre,
  handlePrecioCuotaChange,precioCuota,
  handleCantCuotasChange,cantCuotas,
  loading, error, successMessage };
};