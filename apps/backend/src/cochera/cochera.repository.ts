import { Repository } from "../shared/repository.js";
import { Cochera } from "./cochera.entity.js";

const cocheras = [
  new Cochera(
    '12a',
    'Ocupada'
  ),
];

export class CocheraRepository implements Repository<Cochera> {
  public async findAll(): Promise<Cochera[] | undefined> {
    return await cocheras;
  }
  public async findOne(item: { numero: string }): Promise <Cochera | undefined >{
    return await cocheras.find((co) => co.numero === item.numero);
  }
  public async add(item: Cochera): Promise<Cochera| undefined> {
    await cocheras.push(item);
    return item;
  }
  public async update(item: Cochera): Promise<Cochera | undefined> {
    const numCochera = cocheras.findIndex((co) => co.numero === item.numero);
    if (numCochera !== -1) {
      cocheras[numCochera] = { ...cocheras[numCochera], ...item };
     }
    return await cocheras[numCochera];
  }
  public async delete(item: { numero: string }): Promise<Cochera | undefined> {
    const numCochera = cocheras.findIndex((ts) => ts.numero === item.numero);
    if (numCochera !== -1) {
      const deletedCochera = cocheras[numCochera];
      await cocheras.splice(numCochera, 1)[0];
      return deletedCochera;
      }
  }

}

