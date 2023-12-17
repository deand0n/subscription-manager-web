import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<unknown>): Promise<void> {
    await db.schema
        .createTable('user')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('first_name', 'varchar', (col) => col.notNull())
        .addColumn('last_name', 'varchar', (col) => col.notNull())
        .addColumn('description', 'varchar(1000)')

        .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
        .addColumn('deleted_at', 'timestamp')
        .execute();

    await db.schema
        .createTable('service')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('price', 'int4', (col) => col.notNull())
        .addColumn('description', 'varchar(1000)')

        .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
        .addColumn('deleted_at', 'timestamp')

        .addColumn('owner_id', 'integer', (col) => col.references('user.id').notNull())
        .execute();

    await db.schema
        .createTable('subscriber')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('description', 'varchar(1000)')

        .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
        .addColumn('deleted_at', 'timestamp')

        .addColumn('user_id', 'integer', (col) => col.references('user.id').notNull())
        .addColumn('service_id', 'integer', (col) => col.references('service.id').notNull())
        .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
    await db.schema.dropTable('subscriber').execute();

    await db.schema.dropTable('service').execute();

    await db.schema.dropTable('user').execute();
}
