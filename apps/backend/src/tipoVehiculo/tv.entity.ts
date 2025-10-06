import crypto from 'node:crypto'
export class TipoVehiculo {
  constructor(
    public nombre: string,
    public id? : number
  ) {}
}