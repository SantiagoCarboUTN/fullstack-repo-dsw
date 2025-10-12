import { Entity, Property, PrimaryKey, Cascade, Collection, ManyToOne} from "@mikro-orm/core";
import { Reserva } from "../reserva/reserva.entity.js";

@Entity()
export class Cuota {

  @ManyToOne(() => Reserva, {primary:true,nullable:false }) //cascade: [Cascade.ALL]
  reserva!: Reserva;

  @PrimaryKey({type:Date,nullable: false} )
  fechaPago!: Date;

  @Property({nullable:false})
  monto!: number;

  @Property({nullable:false})
  estado!: 'PENDIENTE' | 'PAGADA';

}