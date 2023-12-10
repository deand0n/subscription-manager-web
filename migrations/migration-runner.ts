import { FileMigrationProvider, Migrator } from "kysely";
import * as path from 'path'
import { promises as fs } from 'fs'
import { db } from '../database'

process.env.TZ = 'UTC';

const args = process.argv;
const operation = args[2];

console.log(args)

if (operation === '--create') {
    const name = args.find((value) => value.includes('--name='))?.split('--name=')[1];

    if (!name) {
        console.error('No name provided');
    }

    const migrationFileName = `${new Date().getTime()}-${name}.ts`;

    const content = `import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    // Migration code
}

export async function down(db: Kysely<any>): Promise<void> {
    // Migration code
}`

    await fs.appendFile(path.join(__dirname, `./${migrationFileName}`), content)
}

// run up
if (operation === '--up') {
    const migrator = new Migrator({
        db, provider: new FileMigrationProvider({
            fs,
            path,
            // This needs to be an absolute path.
            migrationFolder: path.join(__dirname, './'),
        }),
    })

    const { error, results } = await migrator.migrateToLatest()

    results?.forEach((it) => {
        if (it.status === 'Success') {
            console.log(`migration "${it.migrationName}" was executed successfully`)
        } else if (it.status === 'Error') {
            console.error(`failed to execute migration "${it.migrationName}"`)
        }
    })

    if (error) {
        console.error('failed to migrate')
        console.error(error)
        process.exit(1)
    }

    await db.destroy()
}

// run down
if (operation === '--down') {
    //
}
