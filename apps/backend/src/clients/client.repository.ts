import { Client } from "./client.entity.js";
import { Repository } from "../shared/repository.js";

const clientes= [
  new Client(
  'Juan',
  'Password1234',
  'juan123@gmail.com',
  '549-341-244-2356',
  46392822,
  'a02b91bc-3769-4221-beb1-d7a3aeba7dad'
),
]

export class ClientRepository implements Repository<Client>{
  public async findAll(): Promise<Client[] | undefined> {
    return await clientes
  }
  public findOne(item: { id: string }): Client | undefined {
    return clientes.find((cliente) => cliente.id === item.id)
  }
  public add(item: Client): Client | undefined {
    clientes.push(item);
    return item;
  } 

  public update(item: Client): Client | undefined {
    const idCliente = clientes.findIndex((cliente) => cliente.id === item.id);
    if (idCliente !== -1) {
      clientes[idCliente] ={...clientes[idCliente], ...item}
    }
      return clientes[idCliente]; 
  }  
  public delete(item: { id: string }): Client | undefined {
    const idCliente = clientes.findIndex((cliente) => cliente.id === item.id);
    if (idCliente !== -1) {
      const deletedCliente = clientes[idCliente];
      clientes.splice(idCliente, 1)[0];
      return deletedCliente;
    }

  }


}
