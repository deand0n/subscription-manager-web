import type { UserSelectable, ResourceSelectable } from '../database.types';

export interface Subscriber {
    id: number;
    description?: string;

    created_at: Date | string;
    deleted_at?: Date | string;

    user_id: number;
    resource_id: number;

    user: UserSelectable;
    resource: ResourceSelectable;
}
