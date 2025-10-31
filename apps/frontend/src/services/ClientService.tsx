import type { Client } from "../types/ClientType.tsx";

export const createCliente = async (clienteData: Client)=>{
   const res = await fetch("/api/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clienteData),
    });
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || "Error al crear el cliente");
    }
    return data.data
}

export const getClient = async (id_client:number)=>{
    const res = await fetch(`http://localhost:3000/api/clients/${id_client}`)
    const data =await res.json()
    if (!res.ok) {
      throw new Error(data.message || "Error al traer el cliente");
    }
    
    return data.data

}