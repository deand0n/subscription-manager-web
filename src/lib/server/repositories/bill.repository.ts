import type { BillInsertable, BillUpdateable } from '../../database.types';
import { db } from '../../../../database';
import type { UpdateResult } from 'kysely';
import type { Bill } from '../../@types/bill';

export const billRepository = {
    findById: async (id: number): Promise<Bill | undefined> => {
        return db
            .selectFrom('bill')
            .where('id', '=', id)
            .where('deleted_at', 'is', null)
            .selectAll()
            .executeTakeFirst();
    },

    getAll: async (): Promise<Bill[]> => {
        return db.selectFrom('bill').where('deleted_at', 'is', null).selectAll().execute();
    },

    create: async (bill: BillInsertable): Promise<Bill> => {
        return db.insertInto('bill').values(bill).returningAll().executeTakeFirstOrThrow();
    },

    update: (id: number, updateWith: BillUpdateable) => {
        return db.updateTable('bill').set(updateWith).where('id', '=', id).execute();
    },

    batchDelete: (updateWith: BillUpdateable[]) => {
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
    },

    delete: async (id: number) => {
        return db
            .updateTable('bill')
            .set({ deleted_at: new Date().toISOString() })
            .where('id', '=', id)
            .executeTakeFirst();
    },
};
