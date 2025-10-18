import {Entity,Property,OneToMany, Cascade, Collection, BeforeCreate, BeforeUpdate} from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Vehiculo } from "../vehiculo/vehiculo.entity.js";
import bcrypt from 'bcrypt'
@Entity()
export class Client extends BaseEntity {
  @Property({nullable:false, unique:true})
    mail!: string;

  @Property({nullable:false})
    complete_name!: string;

  @Property({nullable:false})
    password!: string;
  @BeforeCreate()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password && !this.password.startsWith('$2b$')) {// Si hay un password y todavía no está hasheado (no empieza con "$2b$")
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }}

  @Property({nullable:true})
    phone!: string;

  @Property({nullable:true})
    dni!: string;
    
  @OneToMany (()=>Vehiculo, (vehiculo)=>vehiculo.client, {cascade:[Cascade.ALL]})
    vehiculos = new Collection<Vehiculo>(this);
  
  toJSON() {
    const { password, ...rest } = this;
    return rest;
  }
  
  async verificarPassword(plain: string): Promise<boolean> {
    return bcrypt.compare(plain, this.password);
  }
}
