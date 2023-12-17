import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<unknown>): Promise<void> {
    await db.schema
        .createTable('user')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('first_name', 'varchar', (col) => col.notNull())
        .addColumn('last_name', 'varchar')
        .addColumn('gender', 'varchar(50)', (col) => col.notNull())
        .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
        .execute();

    await db.schema
        .createTable('service')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())

        .execute();

    await db.schema
        .createTable('subscription')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
        .addColumn('deleted_at', 'timestamp')
        .addColumn('user_id', 'integer', (col) => col.references('user.id').notNull())
        .addColumn('service_id', 'integer', (col) => col.references('service.id').notNull())
        .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
    // Migration code
}

// import type { Generated, Insertable, Selectable, Updateable } from "kysely";

// export interface Database {
//     subscription: SubscriptionTable;
// }

// export interface SubscriptionTable {
//     id: Generated<number>;
// }

// export type Subscription = Selectable<SubscriptionTable>
// export type NewSubscription = Insertable<SubscriptionTable>
// export type SubscriptionUpdate = Updateable<SubscriptionTable>

// export interface SubscriberTable {
//     id: Generated<number>;
// }

// export interface UserTable {
//     id: Generated<number>;
// }
