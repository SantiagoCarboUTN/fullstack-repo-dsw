import {Entity,Property,OneToMany, Cascade, Collection} from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity";
import { Vehiculo } from "../vehiculo/vehiculo.entity.js";
@Entity()
export class Client extends BaseEntity {
  @Property({nullable:false})
    mail!: string;

  @Property({nullable:false})
    complete_name!: string;

  @Property({nullable:false})
    password!: string;

  @Property({nullable:true})
    phone!: string;

  @Property({nullable:true})
    dni!: string;

    
  @OneToMany (()=>Vehiculo, (vehiculo)=>vehiculo.client, {cascade:[Cascade.ALL]})
    vehiculos = new Collection<Vehiculo>(this);
}
