import { TipoVehiculoRepository } from './tv.repository.js';
import { TipoVehiculo } from './tv.entity.js';
const repository = new TipoVehiculoRepository();
function sanitizedTipoVehiculoInput(req, res, next) {
    req.body.sanitizedTipoVehiculoInput = {
        name: req.body.name,
        descripcion: req.body.descripcion,
        id: req.body.id
    };
    Object.keys(req.body.sanitizedTipoVehiculoInput).forEach((key) => {
        if (req.body.sanitizedTipoVehiculoInput[key] === undefined) {
            delete req.body.sanitizedTipoVehiculoInput[key];
        }
    });
    next();
}
async function findAll(req, res) {
    res.json({ data: await repository.findAll() });
}
async function findOne(req, res) {
    const id = req.params.id;
    const tipoVehiculo = await repository.findOne({ id });
    if (!tipoVehiculo) {
        return res.status(404).json({ error: 'No se encontró el tipo de vehículo' });
    }
    res.json({ data: tipoVehiculo });
}
function add(req, res) {
    const input = req.body.sanitizedTipoVehiculoInput;
    const tipoVehiculoInput = new TipoVehiculo(input.name, input.descripcion, input.id);
    const tipoVehiculo = repository.add(tipoVehiculoInput);
    return res.status(201).json({ message: 'Se creó el tipo de vehículo', data: tipoVehiculo });
}
function update(req, res) {
    req.body.sanitizedTipoVehiculoInput.id = req.params.id;
    const tipoVehiculo = repository.update(req.body.sanitizedTipoVehiculoInput);
    if (!tipoVehiculo) {
        return res.status(404).json({ error: 'No se encontró el tipo de vehículo' });
    }
    return res.status(200).json({ message: 'Se actualizó el tipo de vehículo', data: tipoVehiculo });
}
function remove(req, res) {
    const id = req.params.id;
    const tipoVehiculo = repository.delete({ id });
    if (!tipoVehiculo) {
        return res.status(404).json({ error: 'No se encontró el tipo de vehículo' });
    }
    else {
        return res.status(200).json({ message: 'Se eliminó el tipo de vehículo', data: tipoVehiculo });
    }
}
export { findAll, findOne, add, update, remove, sanitizedTipoVehiculoInput };
//# sourceMappingURL=tv.controler.js.map