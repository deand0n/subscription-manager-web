import { resourceRepository } from '$lib/server/repositories/resource.repository';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    return {
        resources: await resourceRepository.getAll(),
    };
};
