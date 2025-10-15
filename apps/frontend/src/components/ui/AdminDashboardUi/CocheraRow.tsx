import React from "react";

interface CocheraRowProps {
  number: number;
  state: string;
  tipoVehiculo:string
}

export const CocheraRows: React.FC<CocheraRowProps> = ({  //cocherarows porque cocherarow ya existe
  number,
  state,
  tipoVehiculo
}) => {
  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      <td className="py-3 px-4">{number}</td>
      <td className="py-3 px-4">{state}</td>
      <td className="py-3 px-4">{tipoVehiculo}</td>
      <td className="py-3 px-4 flex justify-center gap-3">
        <button className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition">
          Reservar
        </button>
      </td>
    </tr>
  );
};