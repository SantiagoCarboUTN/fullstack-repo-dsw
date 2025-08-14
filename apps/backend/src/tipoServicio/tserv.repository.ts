import { TipoServicio } from "./tserv.entity.js";
import { Repository } from "../shared/repository.js";
const tipoServicios = [
  new TipoServicio(
    'anual',
    100000,
    'a02b91bc-3769-4221-beb1-d7a3aeba7dad'
  ),  
  new TipoServicio(
    'mensual',
    10000,
    'b02b91bc-3769-4221-beb1-d7a3aeba7dad'
  ),
  new TipoServicio(
    'xhora',
    1000,
    'c02b91bc-3769-4221-beb1-d7a3aeba7dad'
  )
];
export class TipoServicioRepository implements Repository<TipoServicio> {
  public async findAll(): Promise<TipoServicio[] | undefined> {
    return await tipoServicios;
  }
  public async findOne(item: { id: string }): Promise<TipoServicio | undefined> {
    return await tipoServicios.find((ts) => ts.id === item.id);
  }
  public async add(item: TipoServicio): Promise<TipoServicio | undefined> {
    await tipoServicios.push(item);
    return item;
  }
  public async update(item: TipoServicio): Promise<TipoServicio | undefined> {
    const idTipoServicio = tipoServicios.findIndex((ts) => ts.id === item.id);
    if (idTipoServicio !== -1) {
      tipoServicios[idTipoServicio] = { ...tipoServicios[idTipoServicio], ...item };
    }
    return await tipoServicios[idTipoServicio];
  }
  public async delete(item: { id: string }): Promise<TipoServicio | undefined> {
    const idTipoServicio = tipoServicios.findIndex((ts) => ts.id === item.id);
    if (idTipoServicio !== -1) {
      const deletedTipoServicio = tipoServicios[idTipoServicio];
      await tipoServicios.splice(idTipoServicio, 1)[0];
      return deletedTipoServicio;
    }
  }
}  