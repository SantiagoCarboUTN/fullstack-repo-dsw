import React from "react";
import { Default_Link } from "../default_link.tsx";

interface CocheraRowProps {
  number: number;
  state: string;
  tipoVehiculo:string,
  ubicacion:string,
  listState?:string
}

export const CocheraRows: React.FC<CocheraRowProps> = ({  //cocherarows porque cocherarow ya existe
  number,
  state,
  tipoVehiculo,
  listState,
  ubicacion
}) => {
  if(listState==="ocupada"){
     return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      <td className="py-3 px-4 text-left">{number}</td>
      <td className="py-3 px-4 text-left">{state}</td>
      <td className="py-3 px-4 text-left">{tipoVehiculo}</td>
      <td className="py-3 px-4 text-left">{ubicacion}</td>
      <td className="py-3 px-4 text-left">
      <button
        disabled
        className="bg-gray-600 text-white font-medium px-3 py-1 rounded-lg "
      >
        Reservada
     </button>
      </td>
    </tr>
  );
  }
  return (

    <tr className="border-b hover:bg-gray-50 transition-colors">
      <td className="py-3 px-4">{number}</td>
      <td className="py-3 px-4">{state}</td>
      <td className="py-3 px-4">{tipoVehiculo}</td>
      <td className="py-3 px-4">{ubicacion}</td>
      <td className="py-3 px-4">
        <button className="bg-blue-700 text-white px-3 py-1 rounded-lg hover:bg-blue-800 transition">
          <Default_Link route={`/admin/realizar-reserva/${number}`} text="Reservar" />
        </button>
      </td>
    </tr>
  );
};