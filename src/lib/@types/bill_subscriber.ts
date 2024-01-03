import type { Base } from './base';
import type { Bill } from './bill';
import type { Subscriber } from './subscriber';

export type BillSubscriber = {
    amount: number;
    is_paid_off: boolean;

    bill_id: number;
    subscriber_id: number;

    bill?: Bill | null;
    subscriber?: Subscriber | null;
} & Base;
