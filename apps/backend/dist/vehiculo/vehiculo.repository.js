import { Vehiculo } from "./vehiculo.entity.js";
const vehiculo = [
    new Vehiculo('ABC123', 'Auto de cars'),
];
export class VehiculoRepository {
    async findAll() {
        return await vehiculo;
    }
    findOne(item) {
        return vehiculo.find((v) => v.patente === item.patente);
    }
    add(item) {
        vehiculo.push(item);
        return item;
    }
    update(item) {
        const patenteVehiculo = vehiculo.findIndex((v) => v.patente === item.patente);
        if (patenteVehiculo !== -1) {
            vehiculo[patenteVehiculo] = { ...vehiculo[patenteVehiculo], ...item };
        }
        return vehiculo[patenteVehiculo];
    }
    delete(item) {
        const patenteVehiculo = vehiculo.findIndex((v) => v.patente === item.patente);
        if (patenteVehiculo !== -1) {
            const deletedVehiculo = vehiculo[patenteVehiculo];
            vehiculo.splice(patenteVehiculo, 1);
            return deletedVehiculo;
        }
    }
}
//# sourceMappingURL=vehiculo.repository.js.map