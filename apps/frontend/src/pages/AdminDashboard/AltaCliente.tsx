import { useState } from "react";
import { useAltaCliente  } from "../../hooks/UseAltaCliente.tsx"; 
import type { Client } from "../../types/ClientType.tsx";
export const AltaCliente = () => {
  const [complete_name, setNombre] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [phone, setTelefono] = useState<string>("");
  const [dni, setDni] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  

  const { loading, error, success, registrarCliente } = useAltaCliente();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const clienteData: Client = { complete_name, mail, phone, dni, password };
    registrarCliente(clienteData);
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100   ">
      <div className="bg-white p-12 rounded-lg shadow-md w-full max-w-3xl h-auto">
        <h2 className="text-4xl font-bold mb-8 text-blue-700 text-center">  
          Ingresar Cliente </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre completo*/}
          <div> 
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              Nombre Completo
            </label>
            <input
              type="text"
              placeholder="Ej: Juan Pérez"
              required
              value={complete_name}
              onChange={(e) => setNombre(e.target.value)}
              className="border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              Email
            </label>
            <input
              type="text"
              placeholder="Ej:jperez@example.com"
              required
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              className="border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>
          {/* Teléfono */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              Teléfono
            </label>
            <input 
              type="number"
              onWheel={(e) => e.currentTarget.blur()}
                onKeyDown={(e) => {
                  if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
                }}
              placeholder="Ej: +54 9 11 1234-5678"
              required
              value={phone}
              onChange={(e) => setTelefono(e.target.value)}
              className="no-spinner border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>
          {/* DNI */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              DNI
            </label>
            <input
              type="number"
              onWheel={(e) => e.currentTarget.blur()} 
                onKeyDown={(e) => {
                  if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
                }}
              placeholder="Ej: 12345678"
              required
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              className="no-spinner border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>
          {/* Contraseña */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Ingrese una contraseña..."
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          {/* Botón */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-700 text-white px-8 py-3 rounded-md text-lg hover:bg-green-800 transition-colors"
            >
              {loading ? "Registrando..." : "Registrar Cliente"}
            
            </button>
          </div>
          {error && <p className="text-red-600">{error}</p>}
          {success && <p className="text-green-600">Cliente registrado correctamente!</p>}
        </form>
      </div>
    </div>
  );
};