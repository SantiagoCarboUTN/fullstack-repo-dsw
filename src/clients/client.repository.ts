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
  public findAll(): Client[] | undefined {
    return clientes
  }
  public findOne(item: { id: string }): Client | undefined {
    return clientes.find((cliente) => cliente.id === item.id)
  }
  
}
