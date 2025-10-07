import { useState } from "react";

export const ClientDashboard = () => {
  const [selected, setSelected] = useState("cliente");

  return (
    <div className="flex h-screen">
      {/* Sidebar fija */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Panel Admin</h2>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setSelected("cliente")}
              className={`w-full text-left p-2 rounded ${
                selected === "cliente" ? "bg-gray-600" : "hover:bg-gray-700"
              }`}
            >
              Ingresar Cliente
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelected("vehiculo")}
              className={`w-full text-left p-2 rounded ${
                selected === "vehiculo" ? "bg-gray-600" : "hover:bg-gray-700"
              }`}
            >
              Ingresar Vehículo
            </button>
          </li>
        </ul>
      </div>

      {/* Área dinámica */}
      <div className="flex-1 p-6">
        {selected === "cliente" && (
          <div>
            <h3 className="text-2xl font-semibold mb-4">Formulario Cliente</h3>
            <form className="space-y-2">
              <input type="text" placeholder="Nombre" className="border p-2 w-full" />
              <input type="email" placeholder="Email" className="border p-2 w-full" />
              <button className="bg-blue-600 text-white px-4 py-2 rounded">Guardar</button>
            </form>
          </div>
        )}

        {selected === "vehiculo" && (
          <div>
            <h3 className="text-2xl font-semibold mb-4">Formulario Vehículo</h3>
            <form className="space-y-2">
              <input type="text" placeholder="Patente" className="border p-2 w-full" />
              <input type="text" placeholder="Modelo" className="border p-2 w-full" />
              <button className="bg-green-600 text-white px-4 py-2 rounded">Guardar</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};