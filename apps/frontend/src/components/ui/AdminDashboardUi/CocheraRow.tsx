import React from "react";
import { Default_Link } from "../default_link.tsx";

interface CocheraRowProps {
  number: number;
  state: string;
  tipoVehiculo:string,
  ubicacion:string
}

export const CocheraRows: React.FC<CocheraRowProps> = ({  //cocherarows porque cocherarow ya existe
  number,
  state,
  tipoVehiculo,
  ubicacion
}) => {
  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      <td className="py-3 px-4">{number}</td>
      <td className="py-3 px-4">{state}</td>
      <td className="py-3 px-4">{tipoVehiculo}</td>
      <td className="py-3 px-4">{ubicacion}</td>
      <td className="py-3 px-4">
        <button className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition">
          <Default_Link route={`/admin/realizar-reserva/${number}`} text="Reservar" />
        </button>
      </td>
    </tr>
  );
};