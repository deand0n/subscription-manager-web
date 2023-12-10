import { sql } from "kysely";
import { db } from "./lib/database";


// db.executeQuery(sql`select 1`)
console.log(await sql`select 1`.execute(db))