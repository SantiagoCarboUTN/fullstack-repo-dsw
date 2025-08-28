import { TipoVehiculo } from "./tv.entity.js";
import { pool } from "../shared/db/conn.js";
const tipoVehiculo = [
    new TipoVehiculo('Automovil', 'Vehiculo de cuatro ruedas', 1),
    new TipoVehiculo('Motocicleta', 'Vehiculo de dos ruedas', 2),
    new TipoVehiculo('Camioneta', 'Vehiculo utilitario', 4)
];
export class TipoVehiculoRepository {
    async findAll() {
        try {
            const [tvs] = await pool.query('SELECT * FROM tipo_vehiculo');
            return tvs;
        }
        catch (err) {
            console.error('Error en la consulta:', err);
        }
    }
    async findOne(item) {
        try {
            const [tv] = await pool.query('SELECT * FROM tipo_vehiculo WHERE id = ?', [item.id]);
            if (tv.length > 0) {
                return tv[0];
            }
            return undefined;
        }
        catch (err) {
            console.error('Error en la consulta:', err);
        }
    }
    async add(item) {
        await tipoVehiculo.push(item);
        return item;
    }
    async update(item) {
        const idTipoVehiculo = tipoVehiculo.findIndex((tv) => tv.id === item.id);
        if (idTipoVehiculo !== -1) {
            tipoVehiculo[idTipoVehiculo] = { ...tipoVehiculo[idTipoVehiculo], ...item };
        }
        return await tipoVehiculo[idTipoVehiculo];
    }
    async delete(item) {
        const idTipoVehiculo = tipoVehiculo.findIndex((tv) => tv.id === item.id);
        if (idTipoVehiculo !== -1) {
            const deletedTipoVehiculo = tipoVehiculo[idTipoVehiculo];
            await tipoVehiculo.splice(idTipoVehiculo, 1)[0];
            return deletedTipoVehiculo;
        }
    }
}
//# sourceMappingURL=tv.repository.js.map