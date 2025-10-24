import { Router } from "express"
import { findAll, findOne, add, update, remove, sanitizedSucursalInput } from "./sucursal.controller.js";
export const SucursalRouter = Router();

SucursalRouter.get('/', findAll);
SucursalRouter.get('/:id',findOne)
SucursalRouter.post('/', sanitizedSucursalInput , add)
SucursalRouter.put('/:id', sanitizedSucursalInput, update)
SucursalRouter.delete('/:id', remove)