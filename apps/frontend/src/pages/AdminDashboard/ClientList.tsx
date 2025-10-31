import { useState } from "react";
import { Default_Link } from "../../components/ui/default_link.tsx";

export const ClientList = ()=>{
  const [clientes] = useState([
  { id: 1, mail: "juan@mail.com", complete_name: "Juan Perez", phone: "1122334455", dni: "40111222" },
  { id: 2, mail: "maria@mail.com", complete_name: "Maria Garcia", phone: "1199887766", dni: "38999888" },
  { id: 3, mail: "carlos@mail.com", complete_name: "Carlos Gomez", phone: "1133445566", dni: "42222333" }
  ]);
  return (
    <div className="p-6 grid grid-cols-1 gap-4 w-full">
      <h1 className="text-2xl font-semibold">Clientes</h1>

      <div className="flex gap-4 border-b pb-2">
        <button className="text-blue-600 font-medium">MIS CLIENTES</button>
        <button className="text-gray-500">TODOS</button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Buscar clientes"
          className="border rounded-lg p-2 w-full max-w-sm focus:outline-blue-500"
        />
        <button className="bg-blue-700 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-800 transition">
            <Default_Link route="/admin/alta-cliente" text="Agregar Cliente" />
        </button>

      </div>
        <div className="grid-container w-full border border-gray-300 sm:gap-4 text-sm">
                  {/* Columnas solo para md */}
            <div className="hidden md:grid grid-cols-6 bg-gray-800 text-white font-bold">
              <div className="px-4 py-2 text-left">Id</div>
              <div className="px-4 py-2 text-left">Nombre & Email</div>
              <div className="px-4 py-2 text-left">DNI</div>
              <div className="px-4 py-2 text-left">Telefono</div>
              <div className="px-4 py-2 text-left ">Acciones</div>
        
            </div>
  
          
          {clientes.map(c => (
            <div key={c.id} className="border-b hover:bg-gray-50">
              <p className="px-4 py-3">{c.id}</p>
              <div className="px-4 py-3">
                <p className="font-medium">{c.complete_name}</p>
                <p className="text-gray-600 text-xs">{c.mail}</p>
              </div>
              <div className="px-4 py-3">
                <p className="text-gray-600  font-medium cursor-pointer">{c.dni}</p>
              </div>
              <div className="px-4 py-3 font-medium">
                <p className="text-gray-600 font-medium cursor-pointer">{c.phone}</p>
              </div>
        
                <span className="text-blue-700 font-medium cursor-pointer hover:underline">
                  <Default_Link text="Editar" route={`./Editar/${c.id}` }/>
                </span>
            
            </div>
              ))}
          
        

      </div>
    </div>
)

}