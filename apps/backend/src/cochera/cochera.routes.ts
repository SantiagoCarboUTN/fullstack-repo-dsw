import { Router } from "express";
import { findAll, findOne, add, update, remove, sanitizedCocheraInput } from "./cochera.controller.js"
export const CocheraRouter = Router()
CocheraRouter.get('/', findAll)
CocheraRouter.get('/:number',sanitizedCocheraInput, findOne)
CocheraRouter.post('/', sanitizedCocheraInput, add);
CocheraRouter.put('/:id', sanitizedCocheraInput, update);
CocheraRouter.delete('/:id', remove);