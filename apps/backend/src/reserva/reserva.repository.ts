import { error } from "console";
import { Repository } from "../shared/repository.js";
import { Reserva } from "./reserva.entity.js";

const reservas= [
  new Reserva(
    20000,
  )
]

export class ReservaRepository implements Repository<Reserva>{
  public async findAll(): Promise<Reserva[] | undefined>{
    return await reservas
  }

  public async findOne(item: { [key: string]: string; }): Promise<Reserva | undefined> {
    return await reservas.find((r)=>r.id === item.id)
  }

  public async add(item: Reserva): Promise<Reserva | undefined> {
    await reservas.push(item)
    /* const reserva = await reservas.find((r)=>r.id === item.id )
    return reserva *//* -----> como deberia ser (me aseguro que la reserva fue creada) */
    return item
  }

  public async update(item: Reserva): Promise<Reserva | undefined> {
    const ind = reservas.findIndex((r)=> r.id === item.id)
    if(ind !== -1){
      reservas[ind]={...reservas[ind],...item}
    }
    return await reservas[ind]
  }

  public async delete(item: { [key: string]: string; }): Promise<Reserva | undefined> {
    const ind = reservas.findIndex((r)=> r.id === item.id)
    if(ind !== -1){
      const deletedReserva = reservas[ind]
      await reservas.splice(ind,1)[0]
      return deletedReserva
    }
    
  }
}