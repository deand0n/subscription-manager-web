import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ulid } from "ulidx";

@Entity({ abstract: true })
export abstract class CustomBaseEntity {
    @PrimaryKey()
    id = ulid();

    @Property()
    deletedAt?: Date;

    @Property()
    createdAt = new Date();
}