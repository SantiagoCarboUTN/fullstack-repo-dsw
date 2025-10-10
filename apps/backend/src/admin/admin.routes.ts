import { Router } from "express"
import { findAll, findOne, add, update, remove, sanitizedAdminInput } from "./admin.controller.js";
import { Admin } from "./admin.entity.js";


export const AdminRouter = Router();

AdminRouter.get('/', findAll);
AdminRouter.get('/:id',findOne)
AdminRouter.post('/', sanitizedAdminInput , add)
AdminRouter.put('/:id', sanitizedAdminInput, update)
AdminRouter.delete('/:id', remove)