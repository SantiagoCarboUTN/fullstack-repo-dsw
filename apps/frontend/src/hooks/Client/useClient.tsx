import { useEffect, useState } from "react"

export const useClient = ()=>{
  const [client, setClient] =useState()
  const [loading, setLoading] =useState(false)
  const [error, setError] =useState<string|null>()
  const id_client =  1 
  const fetchCliente = async ()=>{
    setLoading(true)
    try{
      const res = await fetch(`http://localhost:3000/api/clients/${id_client}`)
      if(!res.ok){
        if(res.status === 404){
          throw new Error("No existe el cliente")
          }
          throw new Error("Error al traer el cliente")
      }
      const data =await res.json()
      setClient(data.data)
    }catch(err:unknown){
      if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err)); 
        }
      }finally {
        setLoading(false);
      }
  }
  useEffect(()=>{
    fetchCliente()
  }
    ,[])
    return {client, loading,error}
}