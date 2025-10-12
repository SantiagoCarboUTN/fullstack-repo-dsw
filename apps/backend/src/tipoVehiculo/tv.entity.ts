import {Entity,Property,  Cascade, OneToMany,Collection} from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Vehiculo } from '../vehiculo/vehiculo.entity.js'
import { Cochera } from '../cochera/cochera.entity.js'
@Entity()
export class TipoVehiculo extends BaseEntity{
  @Property({ nullable: false })
  description!: string

  @OneToMany(() => Vehiculo, (vehiculo) => vehiculo.tipoVehiculo, {
    cascade: [Cascade.ALL],
  })
   vehiculos = new Collection<Vehiculo>(this)

   @OneToMany(() => Cochera, (cochera) => cochera.tipoVehiculo, {
    cascade: [Cascade.ALL],
  })
   cocheras = new Collection<Vehiculo>(this)

   
}
