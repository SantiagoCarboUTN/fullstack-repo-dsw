import { Cliente } from "./client.entity.js";
import { Repository } from "../shared/repository.js";

const clientes= [new Cliente(
  'Juan',
  'Password1234',
  'juan123@gmail.com',
  '549-341-244-2356',
  46392822,
  'a02b91bc-3769-4221-beb1-d7a3aeba7dad'
)
]

export class ClientRepository implements Repository<Cliente>{
  public async findAll(): Promise<Cliente[] | undefined> {
    return await clientes
  }
  public async findOne(item: { id: string }): Promise<Cliente | undefined> {
    return await clientes.find(cliente => cliente.id === item.id)
  }
  
}
