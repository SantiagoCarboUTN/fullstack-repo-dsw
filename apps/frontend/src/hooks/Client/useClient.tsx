import { useEffect, useState } from "react"
import type { Client } from "../../types/ClientType.tsx"
import { getClient } from "../../services/ClientService.tsx"

export const useClient = ()=>{
  const [client, setClient] =useState<Client>()
  const [loading, setLoading] =useState(false)
  const [error, setError] =useState<string|null>()
  const id_client =  1 
  const fetchCliente = async ()=>{
    setLoading(true)
    try{
      const res = await getClient(id_client)
      setClient(res)
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