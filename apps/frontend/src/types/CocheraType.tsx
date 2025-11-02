
import type { Admin } from "./AdminType";
import type { Reserva } from "./ReservaType";
import type { Sucursal } from "./SucursalType.tsx";
import type { TipoVehiculo } from "./TipoVehiculoType.tsx";

export interface Cochera {
  number: number,
  state: "disponible" | "ocupada",
  tipoVehiculo: TipoVehiculo,
  admin?: Admin | null,
  reservas?: Reserva[],
  sucursal:Sucursal
}

export interface CocheraForm {
  number: number;
  tipoVehiculo: number
  admin:number,
  sucursal:number
}