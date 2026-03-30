import { Entity,Property,Rel,Cascade,Collection,PrimaryKey,ManyToOne, OneToMany} from "@mikro-orm/core";
import { Admin } from "../admin/admin.entity.js";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Cochera } from "../cochera/cochera.entity.js";
import { User } from "../users/user.entity.js";


@Entity()
export class Sucursal extends BaseEntity{
  @Property({ nullable: false })
   imageUrl!: string
   @Property({ nullable: false })
   razonSocial!: string
   @Property({ nullable: false })
   direction!: string
  @ManyToOne(() => Admin, { }) /* ---> Eliminar relacion post upgrade */
    admin!: Rel<Admin>
  @ManyToOne(() => User, { })
    owner!: Rel<User>

  @OneToMany(() => Cochera, (cochera) => cochera.sucursal, {
    cascade: [Cascade.ALL],
  })
   cocheras = new Collection<Cochera>(this)
}