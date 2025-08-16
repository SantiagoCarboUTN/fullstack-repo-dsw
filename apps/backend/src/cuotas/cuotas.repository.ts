import { Repository } from "../shared/repository.js";
import { Cuota } from "./cuotas.entity.js";
const Cuotas = [
  new Cuota(
    '04/04/2005',
    'Pagada'
  )
]
export class CuotaRepository implements Repository<Cuota>{
    public async findAll(): Promise<Cuota[] | undefined> {
      return await Cuotas
    }
    public async findOne(item: { [key: string]: string; }): Promise<Cuota | undefined> {
      return await Cuotas.find((c)=> c.id === item.id)
    }
    public async add(item: Cuota): Promise<Cuota | undefined> {
      await Cuotas.push(item)
      return item
    }
    public async update(item: Cuota): Promise<Cuota | undefined> {
      const ind = Cuotas.findIndex((c)=> c.id === item.id )
      if(ind !== -1){
        Cuotas[ind] = {...Cuotas[ind], ...item}
      }
      return await Cuotas[ind]
    }
    public async delete(item: { [key: string]: string; }): Promise<Cuota | undefined> {
      const ind = Cuotas.findIndex((c)=> c.id === item.id )
      if(ind !== -1){
        const deletedCuota = Cuotas[ind]
        await Cuotas.splice(ind,1)[0]
        return deletedCuota
      }
    }
}