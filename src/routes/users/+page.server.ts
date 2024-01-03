import { userRepository } from '../../lib/serviceLocator';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    return {
        users: await userRepository.getAll(),
    };
};
