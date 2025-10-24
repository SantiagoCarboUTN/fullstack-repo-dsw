import { Entity, ManyToOne, Rel,Property , PrimaryKey, OneToMany,Cascade,Collection, BeforeCreate} from '@mikro-orm/core';
import { Cochera } from '../cochera/cochera.entity.js';
import { Vehiculo } from '../vehiculo/vehiculo.entity.js';
import { TipoVehiculo } from '../tipoVehiculo/tv.entity.js';
import { TipoServicio } from '../tipoServicio/tserv.entity.js';
import { Cuota } from '../cuotas/cuotas.entity.js';
@Entity()
export class Reserva{

 @ManyToOne(() => Cochera, { primary: true })
  cochera!: Rel<Cochera>;

@ManyToOne(() => Vehiculo, { primary: true })
  vehiculo!: Rel<Vehiculo>;

@PrimaryKey({type:Date})
  fechaInicio!: Date;
  
@ManyToOne(() => TipoServicio)
  tipoServicio!: Rel<TipoServicio>;

@OneToMany(() => Cuota, cuota => cuota.reserva, { cascade: [Cascade.ALL] })
  cuotas = new Collection<Cuota>(this);


@Property({ type:Date,nullable: false })
  fechaFin!: Date

@Property({nullable:false})
  state!: 'ACTIVA' | 'FINALIZADA';

@BeforeCreate()
  async ocuparCochera() {
    this.cochera.state = "ocupada";
  }
}