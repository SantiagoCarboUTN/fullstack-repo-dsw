import {Entity,Property,OneToMany,Collection,ManyToOne,Rel,PrimaryKey,Cascade} from '@mikro-orm/core'
import { Client } from '../clients/client.entity.js'
import { TipoVehiculo } from '../tipoVehiculo/tv.entity.js';

import { Reserva } from '../reserva/reserva.entity.js';
import { User } from '../users/user.entity.js';

@Entity()
export class Vehiculo{
  @PrimaryKey({ nullable: false })
  patente!: string;
  @Property({ nullable: false })
  modelo!: string
  
/*   @ManyToOne(() => Client, { nullable: false})
  client!: Rel<Client>
 */
  @ManyToOne(() => User, { nullable: false})
  owner!: Rel<User>
  @ManyToOne(() => TipoVehiculo, { nullable: true })
  tipoVehiculo!: Rel<TipoVehiculo>

  @OneToMany(() => Reserva, (reserva) => reserva.vehiculo, {
      cascade: [Cascade.ALL],
    })
    reservas = new Collection<Reserva>(this)
}
