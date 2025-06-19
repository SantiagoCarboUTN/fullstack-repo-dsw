import { Router } from "express"
import { findAll, findOne, sanitizeClientInput } from "./client.controler.js";

export const Clientrouter = Router();

Clientrouter.get("/", findAll);
Clientrouter.get("/:id", /* findOne */);