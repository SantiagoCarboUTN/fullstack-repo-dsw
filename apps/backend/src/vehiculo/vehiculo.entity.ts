import { TipoVehiculo } from "../tipoVehiculo/tv.entity";

export class Vehiculo {
  constructor(
    public patente: string,
    public tipoVehiculo: string,   //SUPONEMOS y es solo para pruebas
  ) {}
}