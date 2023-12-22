import type { ResourceFrequency } from '../database.types';
import type { Subscriber } from './subscriber';
import type { User } from './user';

export interface Resource {
    id: number;
    name: string;
    price: number;
    description?: string;
    frequency: ResourceFrequency;

    created_at: Date | string;
    deleted_at?: Date | string;

    owner_id: number;

    owner: User;
    subscribers: Subscriber[];
}
