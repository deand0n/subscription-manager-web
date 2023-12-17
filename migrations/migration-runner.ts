import { FileMigrationProvider, Migrator } from 'kysely';
import * as path from 'path';
import { promises as fs } from 'fs';
import { db } from '../database';

process.env.TZ = 'UTC';

type Operation = '--create' | '--up' | '--down'

const args = process.argv;
const operation = args[2] as Operation;

async function createMigration() {
    const name = args.find((value) => value.includes('--name='))?.split('--name=')[1];

    if (!name) {
        console.error('No name provided');
        return;
    }

    const migrationFileName = `${new Date().getTime()}-${name}.ts`;

    const content = `import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    // Migration code
}

export async function down(db: Kysely<any>): Promise<void> {
    // Migration code
}`;

    await fs.appendFile(path.join(__dirname, `./${migrationFileName}`), content);
}

async function runMigrations(operation: Partial<Operation>) {
    type PossibleMethods = 'migrateToLatest' | 'migrateDown'

    const operationToMethod = new Map<Operation, PossibleMethods>([
        ['--up', 'migrateToLatest'],
        ['--down', 'migrateDown'],
    ])

    const method = operationToMethod.get(operation);

    if (!method) {
        console.error('Cannot run migrations');
        return;
    }

    const migrator = new Migrator({
        db,
        provider: new FileMigrationProvider({
            fs,
            path,
            // This needs to be an absolute path.
            migrationFolder: path.join(__dirname, './')
        })
    });

    const { error, results } = await migrator[method]();

    results?.forEach((it) => {
        if (it.status === 'Success') {
            console.log(`migration "${it.migrationName}" was executed successfully`);
        } else if (it.status === 'Error') {
            console.error(`failed to execute migration "${it.migrationName}"`);
        }
    });

    if (error || !results || !results.length) {
        console.error('failed to migrate');
        console.error(error);
        process.exit(1);
    }

    await db.destroy();
}


if (operation === '--create') {
    createMigration();
} else if (operation === '--up' || operation === '--down') {
    runMigrations(operation);
} else {
    console.error('Invalid operation')
}