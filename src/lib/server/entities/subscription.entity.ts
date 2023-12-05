import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { CustomBaseEntity } from "./base.entity";
import { Subscriber } from "./subscriber.entity";

@Entity()
export class Subscription extends CustomBaseEntity {
    @Property()
    name!: string;

    @Property()
    price!: number;

    @OneToMany(() => Subscriber, subscriber => subscriber.subscription)
    subscribers = new Collection<Subscriber>(this)

    // period
}