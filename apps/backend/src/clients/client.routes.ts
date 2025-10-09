import { Router } from "express"
import { findAll, findOne, add, update, remove, sanitizedClientInput } from "./client.controler.js";
import { Client } from "./client.entity.js";


export const ClientRouter = Router();

ClientRouter.get('/', findAll);
ClientRouter.get('/:id',findOne)
ClientRouter.post('/', sanitizedClientInput , add)
ClientRouter.put('/:id', sanitizedClientInput, update)
ClientRouter.delete('/:id', remove)