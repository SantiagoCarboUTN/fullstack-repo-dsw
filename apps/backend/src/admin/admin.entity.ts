import { Entity, Property,OneToMany, Cascade,Collection  } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Cochera} from "../cochera/cochera.entity.js";

@Entity()
export class Admin extends BaseEntity {
  @Property()
  nombre!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;  

  @OneToMany(() => Cochera, (cochera) => cochera.admin, { cascade: [Cascade.ALL] })
  cocheras = new Collection<Cochera>(this);
}
