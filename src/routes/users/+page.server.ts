import { userRepository } from '../../lib/server/repositories/user.repository';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    return {
        users: await userRepository.getAll(),
    };
};
