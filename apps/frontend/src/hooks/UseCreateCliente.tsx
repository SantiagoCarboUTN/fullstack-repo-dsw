import { useState } from "react";
import type { Client } from "../types/ClientType.tsx";


export interface ClienteData {
  nombre: string;
  email: string;
  telefono: string;
  dni: string;
  password: string;
}


export const useCreateCliente = () => {
  const[loading, setLoading] = useState<boolean>(false );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const registrarCliente = async (clienteData:Client) => {
    setLoading(true);
    setError("");
    setSuccess(false);
  
  try {
    const res = await fetch("/api/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clienteData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error al registrar cliente");
    }else {
      setSuccess(true);
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError(String(err)); 
    }
  }finally {
    setLoading(false);
  }   
};
return { registrarCliente, loading, error, success };
};