

import { Small_Card } from "../Small_Card.tsx";

interface ReservaCardProps {
  label: string;
  fechaIni: string;
  vehiculo: string;
  sucursal: string;
  imgSucursal:string;
  fechaFin:string;
  ubicacion:string
}

export const ReservaInfoCard = ({ label, fechaIni,fechaFin,sucursal,vehiculo,imgSucursal,ubicacion }:ReservaCardProps) => {
  return (
    <div
      className="
        bg-white 
        shadow-md 
        rounded-3xl 
        p-4
        w-100 
        h-screen 
        flex 
        flex-col 
        justify-start
        hover:shadow-lg
      "
    >
      <h2 className="text-blue-700 text-4xl font-medium mb-4 text-center">{label}</h2>
      <p className="text-gray-700 text-3xl font-medium mb-1 ">Fecha Inicio</p>
      <p className="text-blue-700 text-2xl ">{fechaIni}</p>
      <p className="text-gray-700 text-3xl font-medium mb-1">Patente</p>
      <p className="text-blue-700 text-2xl ">{vehiculo}</p>
      <p className="text-gray-700 text-3xl font-medium mb-1 ">Fecha fin</p>
      <p className="text-blue-700 text-2xl ">{fechaFin}</p>
      <p className="text-gray-700 text-3xl font-medium mb-1">Sucursal</p>
      <Small_Card text={sucursal} imgSrc={imgSucursal}/>
      <p className="text-gray-700 text-3xl font-medium mb-1 mt-4">Ubicación</p>
      <p className="text-blue-700 text-2xl ">{ubicacion}</p>
      
  </div>
  );
};