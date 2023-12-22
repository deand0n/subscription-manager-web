import type { Resource } from './resource';

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    description?: string;

    created_at: Date | string;
    deleted_at?: Date | string;

    resources: Resource[];
}
