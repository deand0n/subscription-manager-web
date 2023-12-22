import type { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely';

export type BaseKeys = 'id' | 'created_at' | 'deleted_at';

export interface Database {
    user: UserTable;
    resource: ResourceTable;
    subscriber: SubscriberTable;
}

export interface UserTable {
    id: Generated<number>;
    first_name: string;
    last_name: string;
    description?: string;

    created_at: ColumnType<Date, string | undefined, never>;
    deleted_at: ColumnType<Date | undefined, never, string | undefined>;
}

export type UserSelectable = Selectable<UserTable>;
export type UserInsertable = Insertable<UserTable>;
export type UserUpdateable = Updateable<UserTable>;

export enum ResourceFrequency {
    MONTHLY = 'MONTHLY',
    YEARLY = 'YEARLY',
}

export interface ResourceTable {
    id: Generated<number>;
    name: string;
    price: number;
    description?: string;
    frequency: ResourceFrequency;

    created_at: ColumnType<Date, string | undefined, never>;
    deleted_at: ColumnType<Date | undefined, never, string | undefined>;

    owner_id: number;
}

export type ResourceSelectable = Selectable<ResourceTable>;
export type ResourceInsertable = Insertable<ResourceTable>;
export type ResourceUpdateable = Updateable<ResourceTable>;

export interface SubscriberTable {
    id: Generated<number>;
    description?: string;

    created_at: ColumnType<Date, string | undefined, never>;
    deleted_at: ColumnType<Date | undefined, never, string | undefined>;

    user_id: number;
    resource_id: number;
}

export type SubscriberSelectable = Selectable<SubscriberTable>;
export type SubscriberInsertable = Insertable<SubscriberTable>;
export type SubscriberUpdateable = Updateable<SubscriberTable>;
