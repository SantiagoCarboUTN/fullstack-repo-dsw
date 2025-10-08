import {
  Entity,
  Property,
  Cascade,
  BaseEntity,
  OneToMany,
  Collection,
  ManyToOne,
  Rel,
  PrimaryKey
} from '@mikro-orm/core'
import { Client } from '../clients/client.entity.js'
import { TipoVehiculo } from '../tipoVehiculo/tv.entity.js';

@Entity()
export class Vehiculo{
  @PrimaryKey()
  patente!: string;
  @Property({ nullable: false })
  modelo!: string
  
  @ManyToOne(() => Client, { nullable: false })
  client!: Rel<Client>

  @ManyToOne(() => TipoVehiculo, { nullable: false })
  tipoVehiculo!: Rel<TipoVehiculo>
}
