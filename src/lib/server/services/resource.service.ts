import {
    ResourceFrequency,
    type ResourceInsertable,
    type ResourceUpdateable,
} from '../../database.types';
import type { Resource } from '../../@types/resource';
import { resourceRepository } from '../../serviceLocator';

export class ResourceService {
    async findById(id: number, lazy = true): Promise<Resource | undefined> {
        return resourceRepository.findById(id, lazy);
    }

    async isBilled(id: number, billing_start: Date | string, frequency: ResourceFrequency) {
        return resourceRepository.isBilled(id, billing_start, frequency);
    }

    getAll(lazy = true): Promise<Resource[]> {
        return resourceRepository.getAll(lazy);
    }

    create(resource: ResourceInsertable): Promise<Resource | undefined> {
        return resourceRepository.create(resource);
    }

    update(id: number, updateWith: ResourceUpdateable) {
        return resourceRepository.update(id, updateWith);
    }

    batchDelete(updateWith: ResourceUpdateable[]) {
        return resourceRepository.batchDelete(updateWith);
    }

    delete(id: number) {
        return resourceRepository.delete(id);
    }
}
