import { resourceRepository } from '../../lib/serviceLocator';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    return {
        resources: await resourceRepository.getAll(),
    };
};
