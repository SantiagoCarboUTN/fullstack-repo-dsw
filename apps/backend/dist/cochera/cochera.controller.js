import { CocheraRepository } from "./cochera.repository.js";
import { Cochera } from "./cochera.entity.js";
const repository = new CocheraRepository();
function sanitizedCocheraInput(req, res, next) {
    req.body.sanitizedCocheraInput = {
        numero: req.body.numero,
        estado: req.body.estado
    };
    Object.keys(req.body.sanitizedCocheraInput).forEach((key) => {
        if (req.body.sanitizedCocheraInput[key] === undefined) {
            delete req.body.sanitizedCocheraInput[key];
        }
    });
    next();
}
async function findAll(req, res) {
    res.json({ data: await repository.findAll() });
}
async function findOne(req, res) {
    const numero = req.params.numero;
    const cochera = await repository.findOne({ numero });
    if (!cochera) {
        return res.status(404).json({ error: "No se encontró la cochera" });
    }
    res.json({ data: cochera });
}
function add(req, res) {
    const input = req.body.sanitizedCocheraInput;
    const cocheraInput = new Cochera(input.numero, input.estado);
    const cochera = repository.add(cocheraInput);
    return res.status(201).json({ message: "Se creó la cochera", data: cochera });
}
function update(req, res) {
    req.body.sanitizedCocheraInput.numero = req.params.numero;
    const cochera = repository.update(req.body.sanitizedCocheraInput);
    if (!cochera) {
        return res.status(404).json({ error: "No se encontró la cochera" });
    }
    return res.status(200).json({ message: "Se actualizó la cochera", data: cochera });
}
function remove(req, res) {
    const numero = req.params.numero;
    const cochera = repository.delete({ numero });
    if (!cochera) {
        return res.status(404).json({ error: "No se encontró la cochera" });
    }
    else {
        return res.status(200).json({ message: "Se eliminó la cochera", data: cochera });
    }
}
export { findAll, findOne, add, update, remove, sanitizedCocheraInput };
//# sourceMappingURL=cochera.controller.js.map