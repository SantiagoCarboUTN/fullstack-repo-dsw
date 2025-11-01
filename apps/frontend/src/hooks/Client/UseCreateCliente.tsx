import { useState } from "react";
import type {  ClienteInput } from "../../types/ClientType.tsx";
import { createCliente } from "../../services/ClientService.tsx";


export interface ClienteData {
  nombre: string;
  email: string;
  telefono: string;
  dni: string;
  password: string;
}


export const useCreateCliente = () => {
  const[loading, setLoading] = useState<boolean>(false );
  const [error, setError] = useState<string | null>(null)
  const [complete_name, setName] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [dni, setDni] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleMailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMail(e.target.value)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value)
  }

  const handleDniChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDni(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const clienteData: ClienteInput = { complete_name, mail, phone, dni, password };
    setLoading(true);
    setError("");
    setSuccessMessage(null);
  
    try {
      const res = await createCliente(clienteData)

      setMail("")
      setDni("")
      setName("")
      setPassword("")
      setPhone("")
      setSuccessMessage(`Cliente ${res.complete_name} fue registrado con exito`);
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
  
return { handleSubmit,
  handleNameChange,complete_name,
  handleMailChange,mail,
  handleDniChange,dni,
  handlePhoneChange,phone,
  handlePasswordChange,password,
  loading, error, successMessage };
};