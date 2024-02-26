import type { BillInsertable } from '../../database.types';
import { db } from '../../../../database';
import type { Bill } from '../../@types/bill';
import { createLogger } from '../../logger/logger';

export class BillRepository {
    private logger = createLogger(BillRepository.name);

    async create(auth_user_id: string, bill: BillInsertable): Promise<Bill | undefined> {
        const resource = await db
            .selectFrom('resource')
            .select(['id'])
            .where('resource.id', '=', bill.resource_id)
            .where('auth_user_id', '=', auth_user_id)
            .execute();

        if (!resource) {
            this.logger.warn(`No resource found when creating bill. Data: ${JSON.stringify(bill)}`);
            return;
        }

        return db.insertInto('bill').values(bill).returningAll().executeTakeFirstOrThrow();
    }

    async getAll(): Promise<Bill[]> {
        const bills = await db.selectFrom('bill').selectAll().innerJoin('bill_subscriber', 'bill.id', 'bill_subscriber.bill_id').execute();
        return bills;
    }
}
