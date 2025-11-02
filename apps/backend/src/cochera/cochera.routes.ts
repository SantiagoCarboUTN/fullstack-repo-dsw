import { Router } from "express";
import { findAll, findOne, add, update, remove, sanitizedCocheraInput} from "./cochera.controller.js"
export const CocheraRouter = Router()
CocheraRouter.get('/', findAll)
CocheraRouter.get('/:admin/:number',sanitizedCocheraInput, findOne)
CocheraRouter.post('/', sanitizedCocheraInput, add);
CocheraRouter.put('/:admin/:number/', sanitizedCocheraInput, update);
CocheraRouter.delete('/:admin/:number', remove);