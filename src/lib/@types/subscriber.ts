import type { UserSelectable, ResourceSelectable } from '../database.types';
import type { Base } from './base';

export type Subscriber = {
    description?: string;

    user_id: number;
    resource_id: number;

    user: UserSelectable;
    resource: ResourceSelectable;
} & Base;
