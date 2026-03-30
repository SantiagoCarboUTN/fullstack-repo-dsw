import { Property, Entity, OneToMany, Cascade, ManyToOne, Rel, Collection } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Reserva } from "../reserva/reserva.entity.js";
import { Admin } from "../admin/admin.entity.js";
import { User } from "../users/user.entity.js";


@Entity()
export class TipoServicio extends BaseEntity {
  @Property({ nullable: false })
  nombre!: string;

  @Property({ nullable: false })
  precioCuota!: number;

  @Property({ nullable: false })
  cantCuotas!: number;
  
  @OneToMany(() => Reserva, reserva => reserva.tipoServicio)
  reservas = new Collection<Reserva>(this);

/*   @ManyToOne(() => Admin, { nullable:true})
    admin!: Rel<Admin> *//* Comento para poder compilar */

  @ManyToOne(() => User, { nullable:true})
    owner!: Rel<User>
}