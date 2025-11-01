import type { ClienteInput, ClientForm } from "../types/ClientType.tsx";

export const createCliente = async (clienteData: ClienteInput)=>{
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

export const getClient = async (id_client:string)=>{
    const res = await fetch(`http://localhost:3000/api/clients/${id_client}`)
    const data =await res.json()
    if (!res.ok) {
      throw new Error(data.message || "Error al traer el cliente");
    }
    
    return data.data
}

export const getClients = async ()=>{
  const res = await fetch(`http://localhost:3000/api/clients`)
  const data =await res.json()
  if (!res.ok) {
    throw new Error(data.message || "Error al traer los cliente");
  }
    return data

}


export const updateClient = async (id:string, clienteData: ClientForm)=>{
  const res = await fetch(`/api/clients/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clienteData),
    });
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || "Error al modificar el cliente");
  }
  return data.data
}



export const deleteClient = async (id:string)=>{
  const res = await fetch(`/api/clients/${id}`, {
      method: "DELETE"});
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || "Error al eliminar el cliente");
  }
  return data.data
}