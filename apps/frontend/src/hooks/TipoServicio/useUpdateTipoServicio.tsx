import { useState } from "react"
import type { TipoServicioForm } from "../../types/TipoServicioType.tsx"
import { updateTipoServicio } from "../../services/TipoServicioService.tsx"

export const useUpdateTipoServicio = (id?:string)=>{
  const [successMessage, setSuccessMessage] = useState<string |null>(null)
  const [saving,setSaving] = useState<boolean>(false)
  const [error, setError] =useState<string |null>(null)
  const [form, setForm] = useState<TipoServicioForm>({
   cantCuotas:0,
   precioCuota:0,
   nombre:""
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSaving(true);
      setError("");
      setSuccessMessage(null);
      try {
        const res = await updateTipoServicio(id ||"0",form)
        setSuccessMessage(`Servicio ${res.nombre} fue actualizado con exito`);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err)); 
        }
      }finally {
        setSaving(false);
      }   
  
  
    };


  return {handleChange,handleSubmit,saving,error,successMessage,form,setForm}
}
