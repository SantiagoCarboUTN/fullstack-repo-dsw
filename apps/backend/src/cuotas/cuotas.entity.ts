import { Entity, Property, PrimaryKey, Cascade, Collection, ManyToOne} from "@mikro-orm/core";
import { Reserva } from "../reserva/reserva.entity.js";

@Entity()
export class Cuota {

  @ManyToOne(() => Reserva, {primary:true, cascade: [Cascade.ALL] })
  reserva!: Reserva;

  @PrimaryKey()
  date!: number;

  @Property()
  monto!: number;

  @Property()
  estado!: 'PENDIENTE' | 'PAGADA';

}