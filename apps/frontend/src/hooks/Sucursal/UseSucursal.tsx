import { useEffect,useState } from "react";
import type { Sucursal } from "../../types/SucursalType.tsx";


export const useSucursales = ()=>{
  const [sucursales,setSucursals] = useState<Sucursal[]>([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  
  const fetchSucursales = async ()=>{
      setLoading(true)
      try{
       const res = await fetch(`http://localhost:3000/api/sucursal`) 
       if (!res.ok){
        if(res.status === 404){
          throw new Error("No hay sucursales disponibles")
          }
          throw new Error("Error al traer sucursales")
       }
       const data = await res.json()
       setSucursals(data.data); 
  
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
    useEffect(() => {
      fetchSucursales();
    },[])
  return {sucursales, loading,error, fetchSucursales}
}