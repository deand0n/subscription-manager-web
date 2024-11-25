import { sql, type UpdateResult } from 'kysely';
import { db } from '../../../../database';
import {
    ResourceFrequency,
    type ResourceInsertable,
    type ResourceUpdateable,
} from '../../database.types';
import { jsonArrayFrom } from 'kysely/helpers/postgres';
import type { Resource } from '../../@types/resource';
import { addMonths, addYears, subMonths, subYears } from 'date-fns';

export class ResourceRepository {
    async findById(auth_user_id: string, id: number, lazy = true): Promise<Resource | undefined> {
        return db
            .selectFrom('resource')
            .selectAll()
            .$if(!lazy, (qb) =>
                qb.select((eb) => [
                    jsonArrayFrom(
                        eb
                            .selectFrom('subscriber')
                            .innerJoin('user', 'subscriber.user_id', 'user.id')
                            .whereRef('subscriber.resource_id', '=', 'resource.id')
                            .where('subscriber.deleted_at', 'is', null)
                            .selectAll('subscriber')
                            .select([
                                sql<string>`concat("user".first_name, ' ', "user".last_name)`.as(
                                    'user_full_name',
                                ),
                            ]),
                    ).as('subscribers'),
                ]),
            )

            .where('resource.id', '=', id)
            .where('resource.deleted_at', 'is', null)
            .where('resource.auth_user_id', '=', auth_user_id)
            .executeTakeFirst();
    }

    async isBilled(
        auth_user_id: string,
        id: number,
        billing_start: Date | string,
        frequency: ResourceFrequency,
    ) {
        const getBoundary = () => {
            if (frequency === ResourceFrequency.MONTHLY) {
                return {
                    lower: subMonths(billing_start, 1),
                    upper: addMonths(billing_start, 1),
                };
            } else if (frequency === ResourceFrequency.YEARLY) {
                return {
                    lower: subYears(billing_start, 1),
                    upper: addYears(billing_start, 1),
                };
            }

            throw 'Invalid resource frequency';
        };

        const boundary = getBoundary();
        const lowerBoundary = boundary.lower;
        const upperBoundary = boundary.upper;

        const bill = await db
            .selectFrom('bill')
            .select(['id'])
            .where('bill.resource_id', '=', id)
            .where('bill.deleted_at', 'is', null)
            .where('bill.created_at', '>=', lowerBoundary)
            .where('bill.created_at', '<=', upperBoundary)
            .innerJoin('resource', 'resource.id', 'bill.resource_id')
            .where('resource.auth_user_id', '=', auth_user_id)
            .executeTakeFirst();

        return !!bill;
    }

    getAll(auth_user_id: string, lazy = true): Promise<Resource[]> {
        return db
            .selectFrom('resource')
            .selectAll()
            .$if(!lazy, (qb) =>
                qb.select((eb) => [
                    jsonArrayFrom(
                        eb
                            .selectFrom('subscriber')
                            .innerJoin('user', 'subscriber.user_id', 'user.id')
                            .whereRef('subscriber.resource_id', '=', 'resource.id')
                            .where('subscriber.deleted_at', 'is', null)
                            .selectAll()
                            .select([
                                sql<string>`concat("user".first_name, ' ', "user".last_name)`.as(
                                    'user_full_name',
                                ),
                            ]),
                    ).as('subscribers'),
                ]),
            )
            .where('deleted_at', 'is', null)
            .where('resource.auth_user_id', '=', auth_user_id)
            .execute();
    }

    create(resource: ResourceInsertable): Promise<Resource | undefined> {
        return db.insertInto('resource').values(resource).returningAll().executeTakeFirstOrThrow();
    }

    update(auth_user_id: string, id: number, updateWith: ResourceUpdateable) {
        return db
            .updateTable('resource')
            .set({
                name: updateWith.name,
                price: updateWith.price,
                description: updateWith.description,
                frequency: updateWith.frequency,
                billing_start: updateWith.billing_start,
                telegram_group_id: updateWith.telegram_group_id,
            })
            .where('id', '=', id)
            .where('deleted_at', 'is', null)
            .where('resource.auth_user_id', '=', auth_user_id)
            .execute();
    }

    batchDelete(auth_user_id: string, updateWith: ResourceUpdateable[]) {
        return db.transaction().execute(async (transaction) => {
            const promises: Promise<UpdateResult[]>[] = [];

            for (const resource of updateWith) {
                if (!resource || !resource.id) {
                    continue;
                }

                resource.deleted_at = new Date().toISOString();
                promises.push(
                    transaction
                        .updateTable('resource')
                        .set({ deleted_at: resource.deleted_at })
                        .where('id', '=', resource.id)
                        .where('deleted_at', 'is', null)
                        .where('resource.auth_user_id', '=', auth_user_id)
                        .execute(),
                );
            }

            return await Promise.all(promises);
        });
    }
}
