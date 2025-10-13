import { Entity, ManyToOne, Rel,Property , PrimaryKey, DateType} from '@mikro-orm/core';
import { Cochera } from '../cochera/cochera.entity.js';
import { Vehiculo } from '../vehiculo/vehiculo.entity.js';
import { TipoVehiculo } from '../tipoVehiculo/tv.entity.js';
import { TipoServicio } from '../tipoServicio/tserv.entity.js';
@Entity()
export class Reserva{
 @ManyToOne(() => Cochera, { primary: true })
  cochera!: Rel<Cochera>;
@ManyToOne(() => Vehiculo, { primary: true })
  vehiculo!: Rel<Vehiculo>;
@ManyToOne(() => TipoServicio)
  tipoServicio!: Rel<TipoServicio>;
@PrimaryKey({type:Date})
  fechaInicio!: Date;
@Property({ type:Date,nullable: false })
  fechaFin!: Date
@Property({nullable:false})
  state!: 'ACTIVA' | 'FINALIZADA';
}