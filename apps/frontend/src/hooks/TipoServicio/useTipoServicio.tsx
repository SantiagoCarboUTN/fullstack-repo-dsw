import { useEffect, useState } from "react"
import type { TipoServicio } from "../../types/TipoServicioType.tsx"
import { getTipoServicio } from "../../services/TipoServicioService.tsx"

export const useTipoServicio = (id:string)=>{
  const [tipo, setTipo] =useState<TipoServicio>()
  const [loading, setLoading] =useState(false)
  const [error, setError] =useState<string|null>()
  const fetchTipo = async ()=>{
    setLoading(true)
    try{
      const res = await getTipoServicio(id )
      setTipo(res)
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
    fetchTipo()
  }
    ,[])
  
    return {tipo, loading,error}
}