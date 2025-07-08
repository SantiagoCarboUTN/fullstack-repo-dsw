import { Router } from "express";
import { findAll, findOne, add, update, remove, sanitizedTipoVehiculoInput } from "./tv.controler.js";
export const TipoVehiculoRouter = Router();
TipoVehiculoRouter.get('/', findAll);
TipoVehiculoRouter.get('/:id', findOne);
TipoVehiculoRouter.post('/', sanitizedTipoVehiculoInput, add);
TipoVehiculoRouter.put('/:id', sanitizedTipoVehiculoInput, update);
TipoVehiculoRouter.delete('/:id', remove);
//# sourceMappingURL=tv.routes.js.map