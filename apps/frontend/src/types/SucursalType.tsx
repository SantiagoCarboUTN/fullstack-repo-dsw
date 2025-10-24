import type { Admin } from "./AdminType.tsx";

export interface Sucursal {
  id: number;
  imageUrl: string
  admin:Admin,
  direction:string,
  razonSocial:string
}