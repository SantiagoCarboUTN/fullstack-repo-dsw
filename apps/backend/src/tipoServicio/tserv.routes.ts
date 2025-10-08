/* import { Router } from "express";
import { TipoServicio } from "./tserv.entity.js";
import { findAll, findOne, add, update, remove, sanitizedTipoServicioInput } from "./tserv.controller.js";

export const TipoServicioRouter = Router();
TipoServicioRouter.get('/', findAll);
TipoServicioRouter.get('/:id', sanitizedTipoServicioInput, findOne);
TipoServicioRouter.post('/', sanitizedTipoServicioInput, add);
TipoServicioRouter.put('/:id', sanitizedTipoServicioInput, update);
TipoServicioRouter.delete('/:id', remove); */