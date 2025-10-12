import { Entity, Property,OneToMany, Cascade,Collection, BeforeCreate, BeforeUpdate  } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Cochera} from "../cochera/cochera.entity.js";
import bcrypt from 'bcrypt'
@Entity()
export class Admin extends BaseEntity {
  @Property({nullable:false})
  name!: string;

  @Property({nullable:false, unique:true})
  email!: string;

  @Property({nullable:false, hidden:true})
  password!: string;  
  
  @BeforeCreate()
  @BeforeUpdate()
  async hashPassword() {
  if (this.password && !this.password.startsWith('$2b$')) {// Si hay un password y todavía no está hasheado (no empieza con "$2b$")
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }}

  @OneToMany(() => Cochera, (cochera) => cochera.admin, { cascade: [Cascade.ALL] })
  cocheras = new Collection<Cochera>(this);
  
  async verificarPassword(plain: string): Promise<boolean> {
      return bcrypt.compare(plain, this.password);
    }
}
