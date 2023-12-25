import type { ResourceFrequency } from '../database.types';
import type { Base } from './base';
import type { Subscriber } from './subscriber';
import type { User } from './user';

export type Resource = {
    name: string;
    price: number;
    description?: string;
    frequency: ResourceFrequency;

    owner_id: number;

    owner: User;
    subscribers: Subscriber[];
} & Base;
