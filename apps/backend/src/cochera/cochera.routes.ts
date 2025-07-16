import { Router } from "express";
import { findAll, findOne, add, update, remove, sanitizedCocheraInput } from "./cochera.controller.js"
export const CocheraRouter = Router()
CocheraRouter.get('/', findAll)
CocheraRouter.get('/:numero',sanitizedCocheraInput, findOne)
CocheraRouter.post('/', sanitizedCocheraInput, add);
CocheraRouter.put('/:numero', sanitizedCocheraInput, update);
CocheraRouter.delete('/:numero', remove);