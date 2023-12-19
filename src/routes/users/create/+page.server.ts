import type { Actions } from '../$types';
import { userRepository } from '../../../lib/server/repositories/user.repository';

export const actions = {
    default: async (event) => {
        const data = await event.request.formData();

        const first_name = data.get('first_name') as string;
        const last_name = data.get('last_name') as string;
        const description = data.get('description') as string;

        if (!first_name || !last_name) {
            return { success: false, message: 'Some values were not provided' };
        }

        await userRepository.create({ first_name, last_name, description });

        return { success: true };
    },
} satisfies Actions;
