import { useParams } from "react-router-dom"
import { useEffect, } from "react"
import { useUpdateClient } from "../../hooks/Client/useUpdateClient.tsx"
import { useClient } from "../../hooks/Client/useClient.tsx"
import { SubmitButton } from "../../components/ui/SubmitButton.tsx"
import { MessageBox } from "../../components/ui/messageBox.tsx"


export const EditClient = () => {
  const { id } = useParams()
  const{handleChange,handleSubmit,error,saving,form,setForm,successMessage} = useUpdateClient(id)
  const {loading, error:errorLoading,client}= useClient(id || "0")
  useEffect(() => {
  if (client) {
    setForm({
      complete_name: client.complete_name ,
      mail: client.mail ,
      dni: client.dni ,
      phone: client.phone 
    })
  }
}, [client, setForm])

  return (
    
    <div className="p-6 max-w-lg mx-auto space-y-4">
      
      <h1 className="text-2xl font-semibold">Editar Cliente</h1>
      {loading ? (
            <p className="p-4">Cargando clientes...</p>
          ) : errorLoading ? (
            <p className="p-4 text-red-500">Error: {error}</p>
          ) : (
      <form onSubmit={handleSubmit} className="grid gap-4">

        <div>
          <label className="block font-medium mb-1">Nombre Completo</label>
          <input 
            name="complete_name" 
            value={form.complete_name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input 
            name="mail" 
            value={form.mail}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">DNI</label>
          <input 
            name="dni" 
            value={form.dni}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Teléfono</label>
          <input 
            name="phone" 
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

       <div className="text-center">
          <SubmitButton
              text="Actualizar cliente"
              loadingText="Guardando..."
              loading={saving}
                />
        </div>
        {error &&  <MessageBox message={error} type="error" />}
        {successMessage && <MessageBox message={successMessage} type="success" />}

      </form>
          )}
    </div>
          
  )
}