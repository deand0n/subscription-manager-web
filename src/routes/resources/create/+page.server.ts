import { resourceRepository } from '$lib/server/repositories/resource.repository';
import type { Actions } from '../$types';
import { parseResourceFromForm } from '../../../lib/helpers/parseResourcesFromForm';
import { userRepository } from '../../../lib/server/repositories/user.repository';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    return {
        users: await userRepository.getAll(),
    };
};

export const actions = {
    default: async (event) => {
        const data = await event.request.formData();

        const result = parseResourceFromForm(data);

        if (!result.valid) {
            return { success: false, message: 'Some values were not provided' };
        }

        await resourceRepository.create({ ...result.data });

        return { success: true };
    },
} satisfies Actions;
