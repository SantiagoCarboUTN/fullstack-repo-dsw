import { Router } from "express"
import { findAll, findOne, add, update, remove, sanitizedClientInput } from "./client.controler.js";
import { Client } from "./client.entity.js";


export const Clientrouter = Router();

Clientrouter.get('/', findAll);
Clientrouter.get('/:id',findOne)
Clientrouter.post('/', sanitizedClientInput , add)
Clientrouter.put('/:id', sanitizedClientInput, update)
Clientrouter.delete('/:id', remove)