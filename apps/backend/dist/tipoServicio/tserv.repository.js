import { TipoServicio } from "./tserv.entity.js";
const tipoServicios = [
    new TipoServicio('anual', 100000, 'a02b91bc-3769-4221-beb1-d7a3aeba7dad'),
    new TipoServicio('mensual', 10000, 'b02b91bc-3769-4221-beb1-d7a3aeba7dad'),
    new TipoServicio('xhora', 1000, 'c02b91bc-3769-4221-beb1-d7a3aeba7dad')
];
export class TipoServicioRepository {
    findAll() {
        return tipoServicios;
    }
    findOne(item) {
        return tipoServicios.find((ts) => ts.id === item.id);
    }
    add(item) {
        tipoServicios.push(item);
        return item;
    }
    update(item) {
        const idTipoServicio = tipoServicios.findIndex((ts) => ts.id === item.id);
        if (idTipoServicio !== -1) {
            tipoServicios[idTipoServicio] = { ...tipoServicios[idTipoServicio], ...item };
        }
        return tipoServicios[idTipoServicio];
    }
    delete(item) {
        const idTipoServicio = tipoServicios.findIndex((ts) => ts.id === item.id);
        if (idTipoServicio !== -1) {
            const deletedTipoServicio = tipoServicios[idTipoServicio];
            tipoServicios.splice(idTipoServicio, 1)[0];
            return deletedTipoServicio;
        }
    }
}
//# sourceMappingURL=tserv.repository.js.map