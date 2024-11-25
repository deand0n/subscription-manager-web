import type { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely';

export type BaseKeys = 'id' | 'created_at' | 'deleted_at';

export interface Database {
    user: UserTable;
    resource: ResourceTable;
    subscriber: SubscriberTable;
    bill: BillTable;
    bill_subscriber: BillSubscriberTable;
    auth_user: AuthUserTable;
    auth_user_session: AuthUserSessionTable;
    auth_user_key: AuthUserKeyTable;
}

export interface UserTable {
    id: Generated<number>;
    first_name: string;
    last_name: string;
    description?: string;
    telegram_user_id?: string;

    created_at: ColumnType<Date, string | undefined, never>;
    deleted_at: ColumnType<Date | undefined, never, string | undefined>;
    auth_user_id: string;
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
    billing_start: Date | string;
    telegram_group_id?: string;

    created_at: ColumnType<Date, string | undefined, never>;
    deleted_at: ColumnType<Date | undefined, never, string | undefined>;

    owner_id: number;
    auth_user_id: string;
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

export interface BillTable {
    id: Generated<number>;
    full_amount: number;

    created_at: ColumnType<Date, string | undefined, never>;
    deleted_at: ColumnType<Date | undefined, never, string | undefined>;

    resource_id: number;
}

export type BillSelectable = Selectable<BillTable>;
export type BillInsertable = Insertable<BillTable>;
export type BillUpdateable = Updateable<BillTable>;

export interface BillSubscriberTable {
    id: Generated<number>;
    amount: number;
    is_paid_off: boolean;

    created_at: ColumnType<Date, string | undefined, never>;
    deleted_at: ColumnType<Date | undefined, never, string | undefined>;

    bill_id: number;
    subscriber_id: number;
}

export type BillSubscriberSelectable = Selectable<BillSubscriberTable>;
export type BillSubscriberInsertable = Insertable<BillSubscriberTable>;
export type BillSubscriberUpdateable = Updateable<BillSubscriberTable>;

// lucia

export interface AuthUserTable {
    id: string;

    username: string;

    created_at: ColumnType<Date, string | undefined, never>;
    deleted_at: ColumnType<Date | undefined, never, string | undefined>;
}

export interface AuthUserSessionTable {
    id: string;

    active_expires: number;
    idle_expires: number;

    created_at: ColumnType<Date, string | undefined, never>;
    deleted_at: ColumnType<Date | undefined, never, string | undefined>;

    user_id: string;
}

export interface AuthUserKeyTable {
    id: string;

    hashed_password?: string;

    created_at: ColumnType<Date, string | undefined, never>;
    deleted_at: ColumnType<Date | undefined, never, string | undefined>;

    user_id: string;
}
