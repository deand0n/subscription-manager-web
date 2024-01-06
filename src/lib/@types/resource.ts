import type { ResourceFrequency } from '../database.types';
import type { Base } from './base';
import type { Bill } from './bill';
import type { Subscriber } from './subscriber';
import type { User } from './user';

export type Resource = {
    name: string;
    price: number;
    description?: string;
    frequency: ResourceFrequency;
    billing_start: Date | string;
    telegram_group_id?: string;

    owner_id: number;

    owner?: User | null;
    subscribers?: Subscriber[] | null;
    bills?: Bill[] | null;
} & Base;
