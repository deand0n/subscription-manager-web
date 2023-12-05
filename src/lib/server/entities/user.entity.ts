import { Entity, OneToMany, Property } from "@mikro-orm/core";
import { CustomBaseEntity } from "./base.entity";
import { Subscriber } from "./subscriber.entity";

@Entity()
export class User extends CustomBaseEntity {
    @Property()
    email!: string;

    @OneToMany(() => Subscriber, subscriber => subscriber.user)
    subscribers!: Subscriber;
}