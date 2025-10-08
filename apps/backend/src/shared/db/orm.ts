import { MikroORM } from "@mikro-orm/mysql";
import { SqlHighlighter} from "@mikro-orm/sql-highlighter";
export const orm = await MikroORM.init({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  clientUrl: process.env.MYSQL_URL,
  dbName: process.env.DB_NAME,
  highlighter: new SqlHighlighter(),
  debug:true,
  schemaGenerator: { //--> nunca utilizar en produccion
    disableForeignKeys: true,
    createForeignKeyConstraints: true,
    ignoreSchema:[]
  }
}
)

export const syncSchema = async ()=>{
  const generator = orm.getSchemaGenerator()
  await generator.updateSchema()
}