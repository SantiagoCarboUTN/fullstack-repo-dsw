import { useState } from "react"
import { updateClient } from "../../services/ClientService.tsx"

export const useUpdateClient = (id?:string)=>{
  const [successMessage, setSuccessMessage] = useState<string |null>(null)
  const [saving,setSaving] = useState<boolean>(false)
  const [error, setError] =useState<string |null>(null)
  const [form, setForm] = useState({
    complete_name: "",
    mail: "",
    dni: "",
    phone: ""
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
        const res = await updateClient(id ||"0",form)
        setSuccessMessage(`Cliente ${res.complete_name} fue actualizado con exito`);
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
