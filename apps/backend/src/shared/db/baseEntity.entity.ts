import { PrimaryKey } from "@mikro-orm/mysql";

export abstract class BaseEntity {
  @PrimaryKey()
    id!: number;
}