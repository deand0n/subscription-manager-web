import { userRepository } from '../../lib/server/repositories/user.repository';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    console.log('123');
    return {
        users: await userRepository.getAll(),
    };
};
