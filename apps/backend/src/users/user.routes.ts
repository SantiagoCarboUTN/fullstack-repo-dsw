import { Router } from "express"
import { findAll, findOne, add, update, remove, sanitizedUserInput } from "./user.controller.js";
export const UserRouter = Router();

UserRouter.get('/', findAll);
UserRouter.get('/:id',findOne)
UserRouter.post('/', sanitizedUserInput , add)
UserRouter.put('/:id', sanitizedUserInput, update)
UserRouter.delete('/:id', remove)