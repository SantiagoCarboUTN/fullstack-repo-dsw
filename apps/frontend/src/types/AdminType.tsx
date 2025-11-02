import type { Cochera } from "./CocheraType";

export interface Admin {
  id: number;           // viene de BaseEntity
  complete_name: string;
  email: string;
  cocheras: Cochera[];
  createdAt?: string;
  updatedAt?: string;
}