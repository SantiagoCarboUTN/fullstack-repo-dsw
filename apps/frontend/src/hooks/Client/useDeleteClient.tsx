import { useState } from "react";
import { deleteClient } from "../../services/ClientService.tsx";


export const useDeleteCliente = () => {
  const[loading, setLoading] = useState<boolean>(false );
  const [error, setError] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string>("");
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const handleDeleteClick = (id: number) => {
    setDeleteId(id.toString());
    setDeleteModalOpen(true);
  };
  const handleConfirmDelete = async () => {
    setLoading(true);
    setError("");
    setSuccessMessage(null);
  
    try {
      const res = await deleteClient(deleteId)

      setSuccessMessage(`Cliente ${res.complete_name} fue eliminado con exito`);

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
  
return { handleConfirmDelete, handleDeleteClick,isDeleteModalOpen,
  loading, error, successMessage,setDeleteModalOpen };
};