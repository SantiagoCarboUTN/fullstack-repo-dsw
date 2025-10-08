import { Property, Entity, OneToMany } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Reserva } from "../reserva/reserva.entity.js";

/* id
nombre
precio */
@Entity()
export class tipoServicio extends BaseEntity {
  @Property({ nullable: false })
  nombre!: string;

  @Property({ nullable: false })
  precio!: number;

  @OneToMany(() => Reserva, (reserva) => reserva.tipoServicio)
  reservas!: Reserva[];
}