import { TipoServicio } from "./tserv.entity.js";
const tipoServicio = [
    new TipoServicio('anual', 100000, 'a02b91bc-3769-4221-beb1-d7a3aeba7dad'),
    new TipoServicio('mensual', 10000, 'b02b91bc-3769-4221-beb1-d7a3aeba7dad'),
    new TipoServicio('xhora', 1000, 'c02b91bc-3769-4221-beb1-d7a3aeba7dad')
];
export class TipoServicioRepository {
    findAll() {
        return tipoServicio;
    }
    findOne(item) {
        return tipoServicio.find((ts) => ts.id === item.id);
    }
    add(item) {
        tipoServicio.push(item);
        return item;
    }
    update(item) {
        const idTipoServicio = tipoServicio.findIndex((ts) => ts.id === item.id);
        if (idTipoServicio !== -1) {
            tipoServicio[idTipoServicio] = { ...tipoServicio[idTipoServicio], ...item };
        }
        return tipoServicio[idTipoServicio];
    }
    delete(item) {
        const idTipoServicio = tipoServicio.findIndex((ts) => ts.id === item.id);
        if (idTipoServicio !== -1) {
            const deletedTipoServicio = tipoServicio[idTipoServicio];
            tipoServicio.splice(idTipoServicio, 1)[0];
            return deletedTipoServicio;
        }
    }
}
//# sourceMappingURL=tserv.repository.js.map