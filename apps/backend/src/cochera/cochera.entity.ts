import { Entity,Property,Rel,Cascade,Collection,PrimaryKey,ManyToOne, OneToMany} from "@mikro-orm/core";
import { TipoVehiculo } from "../tipoVehiculo/tv.entity.js";
import { Admin } from "../admin/admin.entity.js";
import { Vehiculo } from "../vehiculo/vehiculo.entity.js";
import { Reserva } from "../reserva/reserva.entity.js";
@Entity()
export class Cochera {
  @PrimaryKey({ nullable: false })
   number!: number;
  @Property({ nullable: false })
   state!: 'disponible' | 'ocupada'
    
  @ManyToOne(() => TipoVehiculo, { nullable: false })
    tipoVehiculo!: Rel<TipoVehiculo>
  
  @ManyToOne(() => Admin, { nullable: true })
    admin!: Rel<Admin>
    
  @OneToMany(() => Reserva, (reserva) => reserva.cochera, {
    cascade: [Cascade.ALL],
  })
   reservas = new Collection<Reserva>(this)
}