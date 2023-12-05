import { Entity, ManyToOne } from "@mikro-orm/core";
import { CustomBaseEntity } from "./base.entity";
import { Subscription } from "./subscription.entity";
import { User } from "./user.entity";

@Entity()
export class Subscriber extends CustomBaseEntity {
    @ManyToOne(() => Subscription)
    subscription!: Subscription

    @ManyToOne(() => User)
    user!: User;
}