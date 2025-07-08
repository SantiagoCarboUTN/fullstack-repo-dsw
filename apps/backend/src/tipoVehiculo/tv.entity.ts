import crypto from 'node:crypto'
export class TipoVehiculo {
  constructor(
    public nombre: string,
    public descripcion: string,
    public id = crypto.randomUUID()
  ) {}
}