import { useEffect, useState } from "react"
import type { Client } from "../../types/ClientType.tsx"
import { getClients } from "../../services/ClientService.tsx"

export const useClients =  ()=>{
  const [clientes, setClients] = useState<Client[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const fetchClientes = async()=>{
    setLoading(true)
    try{
      const res = await getClients()
      setClients(res.data)
      
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
    fetchClientes()
  },[]
  )
  return {clientes, error,loading}

}