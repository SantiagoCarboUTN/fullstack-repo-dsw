import { Entity,Property,Rel,Cascade,Collection,PrimaryKey,ManyToOne, OneToMany} from "@mikro-orm/core";
import { TipoVehiculo } from "../tipoVehiculo/tv.entity.js";
import { Admin } from "../admin/admin.entity.js";
import { Vehiculo } from "../vehiculo/vehiculo.entity.js";
import { Reserva } from "../reserva/reserva.entity.js";
import { Sucursal } from "../sucursal/sucursal.entity.js";
@Entity()
export class Cochera {
  @PrimaryKey({ nullable: false })
   number!: number;
   
  @Property({ nullable: false })
   state!: 'disponible' | 'ocupada'
    
  @ManyToOne(() => TipoVehiculo, { nullable: true })
    tipoVehiculo!: Rel<TipoVehiculo>
  
  @ManyToOne(() => Admin, { primary:true })
    admin!: Rel<Admin>

  @ManyToOne(() => Sucursal, { nullable:true})
    sucursal!: Rel<Sucursal>

  @OneToMany(() => Reserva, (reserva) => reserva.cochera, {
    cascade: [Cascade.ALL],
  })
   reservas = new Collection<Reserva>(this)
}