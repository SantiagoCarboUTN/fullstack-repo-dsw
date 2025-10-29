import { useEffect, useState } from "react"

export const useAdmin = ()=>{
  const [admin, setAdmin] =useState()
  const [loading, setLoading] =useState(false)
  const [error, setError] =useState<string|null>()
  const id_admin =  1 
  const fetchCliente = async ()=>{
    setLoading(true)
    try{
      const res = await fetch(`http://localhost:3000/api/admins/${id_admin}`)
      if(!res.ok){
        if(res.status === 404){
          throw new Error("No existe el admin")
          }
          throw new Error("Error al traer el admin")
      }
      const data =await res.json()
      setAdmin(data.data)
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
    return {admin, loading,error}
}