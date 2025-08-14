import crypto from 'node:crypto'
export class Reserva{
  constructor(
    public tarifa:number,
    public id = crypto.randomUUID())
    {}
}