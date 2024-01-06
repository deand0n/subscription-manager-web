import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<unknown>): Promise<void> {
    await db.schema
        .createTable('user')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('first_name', 'varchar', (col) => col.notNull())
        .addColumn('last_name', 'varchar', (col) => col.notNull())
        .addColumn('description', 'varchar(1000)')
        .addColumn('telegram_user_id', 'varchar(100)')

        .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
        .addColumn('deleted_at', 'timestamp')
        .execute();

    await db.schema
        .createTable('resource')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('name', 'varchar(200)', (col) => col.notNull())
        .addColumn('price', 'int4', (col) => col.notNull())
        .addColumn('description', 'varchar(1000)')
        .addColumn('frequency', 'varchar(50)')
        .addColumn('billing_start', 'varchar')
        .addColumn('telegram_group_id', 'varchar(100)')

        .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
        .addColumn('deleted_at', 'timestamp')

        .addColumn('owner_id', 'integer', (col) => col.references('user.id').notNull())
        .execute();

    await db.schema
        .createTable('subscriber')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('description', 'varchar(1000)')
        .addColumn('billed_at', 'timestamp')

        .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
        .addColumn('deleted_at', 'timestamp')

        .addColumn('user_id', 'integer', (col) => col.references('user.id').notNull())
        .addColumn('resource_id', 'integer', (col) => col.references('resource.id').notNull())
        .execute();

    await db.schema
        .createTable('bill')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('full_amount', 'int4')

        .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
        .addColumn('deleted_at', 'timestamp')

        .addColumn('resource_id', 'integer', (col) => col.references('resource.id').notNull())
        .execute();

    await db.schema
        .createTable('bill_subscriber')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('amount', 'int4')
        .addColumn('is_paid_off', 'boolean')

        .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
        .addColumn('deleted_at', 'timestamp')

        .addColumn('bill_id', 'integer', (col) => col.references('bill.id').notNull())
        .addColumn('subscriber_id', 'integer', (col) => col.references('subscriber.id').notNull())
        .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
    await db.schema.dropTable('bill_subscriber').execute();
    await db.schema.dropTable('bill').execute();
    await db.schema.dropTable('subscriber').execute();
    await db.schema.dropTable('resource').execute();
    await db.schema.dropTable('user').execute();
}
