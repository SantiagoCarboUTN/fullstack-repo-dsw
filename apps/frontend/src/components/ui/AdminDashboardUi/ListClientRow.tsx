import React from "react";

interface CocheraRowProps {
  patente: string;
  hora: string;
  cliente: string;
  cochera: string;
}

export const CocheraRow: React.FC<CocheraRowProps> = ({
  patente,
  hora,
  cliente,
  cochera,
}) => {
  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      <td className="py-3 px-4">{patente}</td>
      <td className="py-3 px-4">{hora}</td>
      <td className="py-3 px-4">{cliente}</td>
      <td className="py-3 px-4">{cochera}</td>
      <td className="py-3 px-4 flex justify-center gap-3">
        <button className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition">
          Finalizar
        </button>
        <button className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition">
          Cancelar
        </button>
        <span className="text-blue-700 font-medium cursor-pointer hover:underline">
          Modificar
        </span>
      </td>
    </tr>
  );
};