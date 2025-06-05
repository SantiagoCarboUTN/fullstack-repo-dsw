import crypto from 'node:crypto'
export class Cliente {
  constructor(
    public name:string, 
    public contraseña:string, 
    public mail:string, 
    public telefono:string, 
    public dni : number,
    public id = crypto.randomUUID()
  ){}
}

