import { TipoVehiculo } from "./tv.entity.js";
const tipoVehiculo = [
    new TipoVehiculo('Automovil', 'Vehiculo de cuatro ruedas', 'a02b91bc-3769-4221-beb1-d7a3aeba7dad'),
    new TipoVehiculo('Motocicleta', 'Vehiculo de dos ruedas', 'b02b91bc-3769-4221-beb1-d7a3aeba7dad'),
    new TipoVehiculo('Camioneta', 'Vehiculo utilitario', 'c02b91bc-3769-4221-beb1-d7a3aeba7dad')
];
export class TipoVehiculoRepository {
    async findAll() {
        return tipoVehiculo;
    }
    async findOne(item) {
        return await tipoVehiculo.find((tv) => tv.id === item.id);
    }
    add(item) {
        tipoVehiculo.push(item);
        return item;
    }
    update(item) {
        const idTipoVehiculo = tipoVehiculo.findIndex((tv) => tv.id === item.id);
        if (idTipoVehiculo !== -1) {
            tipoVehiculo[idTipoVehiculo] = { ...tipoVehiculo[idTipoVehiculo], ...item };
        }
        return tipoVehiculo[idTipoVehiculo];
    }
    delete(item) {
        const idTipoVehiculo = tipoVehiculo.findIndex((tv) => tv.id === item.id);
        if (idTipoVehiculo !== -1) {
            const deletedTipoVehiculo = tipoVehiculo[idTipoVehiculo];
            tipoVehiculo.splice(idTipoVehiculo, 1)[0];
            return deletedTipoVehiculo;
        }
    }
}
//# sourceMappingURL=tv.repository.js.map