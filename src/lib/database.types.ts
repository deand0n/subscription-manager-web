import type { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely';

// https://wanago.io/2023/10/16/api-with-nestjs-129-implementing-soft-deletes-with-sql-and-kysely/

export interface Database {
    user: UserTable;
    service: ServiceTable;
    subscriber: SubscriberTable;
}


export interface UserTable {
    id: Generated<number>;
    first_name: string;
    lase_name: string;
    description?: string;

    created_at: ColumnType<Date, string | undefined, never>
    deleted_at: ColumnType<Date | undefined, never, string | undefined>
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;


export interface ServiceTable {
    id: Generated<number>;
    price: number;
    description?: string;

    created_at: ColumnType<Date, string | undefined, never>;
    deleted_at: ColumnType<Date | undefined, never, string | undefined>;

    owner_id: number;
}

export type Service = Selectable<ServiceTable>;
export type NewService = Insertable<ServiceTable>;
export type ServiceUpdate = Updateable<ServiceTable>;


export interface SubscriberTable {
    id: Generated<number>;
    description?: string;

    user_id: number;
    service_id: number;
}

export type Subscriber = Selectable<SubscriberTable>;
export type NewSubscriber = Insertable<SubscriberTable>;
export type SubscriberUpdate = Updateable<SubscriberTable>;
