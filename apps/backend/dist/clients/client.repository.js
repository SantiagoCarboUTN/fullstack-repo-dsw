import { Client } from "./client.entity.js";
const clientes = [
    new Client('Juan', 'Password1234', 'juan123@gmail.com', '549-341-244-2356', 46392822, 'a02b91bc-3769-4221-beb1-d7a3aeba7dad'),
];
export class ClientRepository {
    async findAll() {
        return await clientes;
    }
    async findOne(item) {
        return await clientes.find((cliente) => cliente.id === item.id);
    }
    add(item) {
        clientes.push(item);
        return item;
    }
    update(item) {
        const idCliente = clientes.findIndex((cliente) => cliente.id === item.id);
        if (idCliente !== -1) {
            clientes[idCliente] = { ...clientes[idCliente], ...item };
        }
        return clientes[idCliente];
    }
    delete(item) {
        const idCliente = clientes.findIndex((cliente) => cliente.id === item.id);
        if (idCliente !== -1) {
            const deletedCliente = clientes[idCliente];
            clientes.splice(idCliente, 1)[0];
            return deletedCliente;
        }
    }
}
//# sourceMappingURL=client.repository.js.map