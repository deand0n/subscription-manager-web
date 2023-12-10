import type { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface Database {
    subscription: SubscriptionTable;
}

export interface SubscriptionTable {
    id: Generated<number>;
}

export type Subscription = Selectable<SubscriptionTable>
export type NewSubscription = Insertable<SubscriptionTable>
export type SubscriptionUpdate = Updateable<SubscriptionTable>

export interface SubscriberTable {
    id: Generated<number>;
}

export interface UserTable {
    id: Generated<number>;
}