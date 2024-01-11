import type { BillInsertable, BillUpdateable } from '../../database.types';
import { db } from '../../../../database';
import type { UpdateResult } from 'kysely';
import type { Bill } from '../../@types/bill';

export class BillRepository {
    async findById(id: number): Promise<Bill | undefined> {
        return db
            .selectFrom('bill')
            .where('id', '=', id)
            .where('deleted_at', 'is', null)
            .selectAll()
            .executeTakeFirst();
    }

    async getAll(): Promise<Bill[]> {
        return db.selectFrom('bill').where('deleted_at', 'is', null).selectAll().execute();
    }

    async create(bill: BillInsertable): Promise<Bill> {
        return db.insertInto('bill').values(bill).returningAll().executeTakeFirstOrThrow();
    }

    async update(id: number, updateWith: BillUpdateable) {
        return db.updateTable('bill').set(updateWith).where('id', '=', id).execute();
    }

    async batchDelete(updateWith: BillUpdateable[]) {
        return db.transaction().execute(async (transaction) => {
            const promises: Promise<UpdateResult[]>[] = [];

            for (const bill of updateWith) {
                if (!bill || !bill.id) {
                    continue;
                }

                bill.deleted_at = new Date().toISOString();
                promises.push(
                    transaction.updateTable('bill').set(bill).where('id', '=', bill.id).execute(),
                );
            }

            return await Promise.all(promises);
        });
    }
}
