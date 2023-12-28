import type { Base } from './base';
import type { Resource } from './resource';
import type { User } from './user';

export type Subscriber = {
    description?: string;

    user_id: number;
    resource_id: number;

    user: User;
    resource: Resource;
} & Base;
