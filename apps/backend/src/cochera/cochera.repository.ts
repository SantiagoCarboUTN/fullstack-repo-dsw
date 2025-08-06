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
  public add(item: Cochera): Cochera| undefined {
    cocheras.push(item);
    return item;
  }
  public update(item: Cochera): Cochera | undefined {
    const numCochera = cocheras.findIndex((co) => co.numero === item.numero);
    if (numCochera !== -1) {
      cocheras[numCochera] = { ...cocheras[numCochera], ...item };
     }
    return cocheras[numCochera];
  }
  public delete(item: { numero: string }): Cochera | undefined {
    const numCochera = cocheras.findIndex((ts) => ts.numero === item.numero);
    if (numCochera !== -1) {
      const deletedCochera = cocheras[numCochera];
      cocheras.splice(numCochera, 1)[0];
      return deletedCochera;
      }
  }

}

