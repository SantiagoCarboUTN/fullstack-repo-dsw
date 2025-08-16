import crypto from 'node:crypto'
export class Cuota{
  constructor(
    public fecha: string,
    public estado:string,
    public id = crypto.randomUUID()
  ){}
}