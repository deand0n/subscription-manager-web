import type { Base } from './base';
import type { Resource } from './resource';

export type User = {
    first_name: string;
    last_name: string;
    description?: string;

    resources?: Resource[];
} & Base;
