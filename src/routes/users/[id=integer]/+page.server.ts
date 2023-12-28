import type { User } from '../../../lib/@types/user';
import { parseUserFromForm } from '../../../lib/helpers/parseUserFromForm';
import { userRepository } from '../../../lib/server/repositories/user.repository';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
    return {
        user: (await userRepository.findById(+event.params.id)) as User,
    };
};

export const actions = {
    update: async (event) => {
        const data = await event.request.formData();

        const result = parseUserFromForm(data);

        if (!result.valid) {
            return { success: false, message: 'Some values were not provided' };
        }

        await userRepository.update(+event.params.id, result.data);

        return { success: true };
    },
} satisfies Actions;
