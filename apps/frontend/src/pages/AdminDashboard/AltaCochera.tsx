import React, { useState } from "react";

import type { TipoVehiculo } from "../../types/TipoVehiculoType.tsx";
import { useTipoVehiculo } from "../../hooks/TipoVehiculo/UseTipoVehiculos.tsx";
import type { CocheraForm } from "../../types/CocheraType.tsx";
import { useCreateCochera } from "../../hooks/Cochera/UseCreateCochera.tsx";
import { useNavigate } from "react-router-dom";
import { SubmitButton } from "../../components/ui/SubmitButton.tsx";

export const AltaCochera = ()=>{
  const navigate = useNavigate()
  const { tipos, loading:loadingTipos, error:errorTipos } = useTipoVehiculo();
  const { createCochera, loading: loadingCreate, error: errorCreate } = useCreateCochera();
  const [tipoVehiculoId, setTipoVehiculoId] = useState("");
  const [numero, setNumero] = useState("");
  const  handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    const nuevaCochera:CocheraForm = {
      tipoVehiculo: Number.parseInt(tipoVehiculoId),
      number:Number.parseInt(numero),
      admin:1,
      sucursal:1
    };
    const res= await createCochera(nuevaCochera)
    if (res) {
      alert(`Cochera creada con numero: ${res.number}`);
      setTipoVehiculoId("");
      setNumero("");
      navigate("/admin/cocheras")
    }
   
  };

  return (
    <>
    <div className="flex justify-center items-center h-screen bg-gray-100   ">
    <div className="bg-white p-12 rounded-lg shadow-md w-full max-w-3xl h-auto">
      <h2 className="text-4xl font-bold mb-8 text-blue-700 text-center">  
        Ingresar Cochera </h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-lg">
            Tipo de Vehículo
          </label>

          {loadingTipos ? (
            <p className="p-4">Cargando cocheras...</p>
          ) : errorTipos ? (
            <p className="p-4 text-red-500">Error: {errorTipos}</p>
          ) : ( 
          <select 
           className="border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
           required
           value={tipoVehiculoId}
           onChange={(e) => setTipoVehiculoId(e.target.value)}
           >
            <option value="">Seleccione un tipo</option>
            {tipos.map((t: TipoVehiculo) => (
                  <option key={t.id} value={t.id}>
                    {t.description}
                  </option>
                ))}
          </select>
        )}

        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-lg">
            Número
          </label>
          <input
            type="number"
            placeholder=""
            required
            className="border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />
        </div>
        <div className="text-center">
            <SubmitButton
               text="Crear cochera"
               loadingText="Guardando..."
                loading={loadingCreate}
                      />
        </div>
         {errorCreate && (
            <p className="text-red-500 text-center mt-4">{errorCreate}</p>
          )}
      </form>
    </div>
  </div>
  </>
  )
}