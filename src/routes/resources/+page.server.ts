import { resourceRepository } from '$lib/server/repositories/resource.repository';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    console.log('123');
    return {
        resources: await resourceRepository.getAll(),
    };
};
