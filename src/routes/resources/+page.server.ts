import { resourceRepository } from '$lib/server/repositories/resource.repository';
import type { Resource } from '../../lib/@types/resource';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    return {
        resources: (await resourceRepository.getAll()) as Resource[],
    };
};
