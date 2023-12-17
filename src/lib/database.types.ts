import type { Generated, Insertable, Selectable, Updateable } from 'kysely';

// https://wanago.io/2023/10/16/api-with-nestjs-129-implementing-soft-deletes-with-sql-and-kysely/

export interface Database {
    subscription: SubscriptionTable;
}

export interface SubscriptionTable {
    id: Generated<number>;
}

export type Subscription = Selectable<SubscriptionTable>;
export type NewSubscription = Insertable<SubscriptionTable>;
export type SubscriptionUpdate = Updateable<SubscriptionTable>;

export interface SubscriberTable {
    id: Generated<number>;
}

export interface UserTable {
    id: Generated<number>;
}
