import type { Base } from './base';
import type { Resource } from './resource';

export type Bill = {
    full_amount: number;

    resource_id: number;

    resource?: Resource | null;
} & Base;
