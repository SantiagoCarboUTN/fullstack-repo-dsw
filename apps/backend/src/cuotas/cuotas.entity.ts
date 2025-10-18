import { Entity, Property, PrimaryKey, Cascade, Collection, ManyToOne, Rel} from "@mikro-orm/core";
import { Reserva } from "../reserva/reserva.entity.js";

@Entity()
export class Cuota {

  @ManyToOne(() => Reserva, {primary:true,nullable:false }) 
  reserva!: Rel<Reserva>;

  @PrimaryKey({type:Date,nullable: false} )
  fechaPago!: Date;

  @Property({nullable:false})
  monto!: number;

  @Property({nullable:false})
  state!: 'pendiente' | 'pagada';

}