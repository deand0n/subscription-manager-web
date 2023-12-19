import { resourceRepository } from '$lib/server/repositories/resource.repository';
import { userRepository } from '../../lib/server/repositories/user.repository';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    console.log('123');
    return {
        resources: await resourceRepository.getAll(),
        users: await userRepository.getAll(),
    };
};
