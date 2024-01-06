import type { Base } from './base';
import type { Resource } from './resource';

export type User = {
    first_name: string;
    last_name: string;
    description?: string;
    telegram_user_id?: string;

    resources?: Resource[];
} & Base;
