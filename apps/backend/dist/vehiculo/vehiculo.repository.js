import { Vehiculo } from "./vehiculo.entity.js";
const vehiculo = [
    new Vehiculo('ABC123', 'Auto de cars'),
];
export class VehiculoRepository {
    async findAll() {
        return await vehiculo;
    }
    async findOne(item) {
        return await vehiculo.find((v) => v.patente === item.patente);
    }
    async add(item) {
        await vehiculo.push(item);
        return item;
    }
    async update(item) {
        const patenteVehiculo = vehiculo.findIndex((v) => v.patente === item.patente);
        if (patenteVehiculo !== -1) {
            vehiculo[patenteVehiculo] = { ...vehiculo[patenteVehiculo], ...item };
        }
        return await vehiculo[patenteVehiculo];
    }
    async delete(item) {
        const patenteVehiculo = vehiculo.findIndex((v) => v.patente === item.patente);
        if (patenteVehiculo !== -1) {
            const deletedVehiculo = vehiculo[patenteVehiculo];
            await vehiculo.splice(patenteVehiculo, 1);
            return deletedVehiculo;
        }
    }
}
//# sourceMappingURL=vehiculo.repository.js.map