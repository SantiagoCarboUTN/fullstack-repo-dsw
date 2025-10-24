import type { Client } from "../types/ClientType.tsx";

export const createCliente = async (clienteData: Client)=>{
   const res = await fetch("/api/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clienteData),
    });

    return res
}