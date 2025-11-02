import { Entity, Property, PrimaryKey, Cascade, Collection, OneToOne, Rel} from "@mikro-orm/core";
import { Cuota } from "../cuotas/cuotas.entity.js";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";

@Entity()
export class Pago extends BaseEntity{

  @OneToOne(() => Cuota, { owner: true })
  cuota!: Rel<Cuota>;

  @Property({ nullable: false })
  fecha!: Date;

  @Property({ nullable: false })
  metodo!: string; 

  @Property({ nullable: true })
  transactionId?: string; 

  @Property({ nullable: true })
  state?: string; 
}