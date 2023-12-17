import type { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely';

// https://wanago.io/2023/10/16/api-with-nestjs-129-implementing-soft-deletes-with-sql-and-kysely/

export interface Database {
    user: UserTable;
    resource: ResourceTable;
    subscriber: SubscriberTable;
}

export interface UserTable {
    id: Generated<number>;
    first_name: string;
    lase_name: string;
    description?: string;

    created_at: ColumnType<Date, string | undefined, never>;
    deleted_at: ColumnType<Date | undefined, string, string | undefined>;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

export interface ResourceTable {
    id: Generated<number>;
    name: string;
    price: number;
    description?: string;

    created_at: ColumnType<Date, string | undefined, never>;
    deleted_at: ColumnType<Date | undefined, never, string | undefined>;

    owner_id: number;
}

export type Resource = Selectable<ResourceTable>;
export type NewResource = Insertable<ResourceTable>;
export type ResourceUpdate = Updateable<ResourceTable>;

export interface SubscriberTable {
    id: Generated<number>;
    description?: string;

    created_at: ColumnType<Date, string | undefined, never>;
    deleted_at: ColumnType<Date | undefined, never, string | undefined>;

    user_id: number;
    resource_id: number;
}

export type Subscriber = Selectable<SubscriberTable>;
export type NewSubscriber = Insertable<SubscriberTable>;
export type SubscriberUpdate = Updateable<SubscriberTable>;
