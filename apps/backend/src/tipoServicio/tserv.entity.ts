import { Property, Entity, OneToMany, Cascade, ManyToOne, Rel } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Reserva } from "../reserva/reserva.entity.js";
import { Admin } from "../admin/admin.entity.js";


@Entity()
export class TipoServicio extends BaseEntity {
  @Property({ nullable: false })
  nombre!: string;

  @Property({ nullable: false })
  precioCuota!: number;

  @Property({ nullable: false })
  cantCuotas!: number;
  
  @OneToMany(() => Reserva, (reserva) => reserva.tipoServicio )
  reservas!: Reserva[];

  @ManyToOne(() => Admin, { nullable:true})
    admin!: Rel<Admin>
}