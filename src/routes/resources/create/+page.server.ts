import type { Actions } from '../$types';
import { parseResourceFromForm } from '../../../lib/helpers/parseResourcesFromForm';
import { getAuthUserIdFromCookies } from '../../../lib/server/helpers/getAuthUserFromCookies';
import { userRepository, resourceRepository } from '../../../lib/serviceLocator';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
    const auth_user_id = await getAuthUserIdFromCookies(event.cookies, event.locals.auth);

    return {
        users: await userRepository.getAll(auth_user_id),
    };
};

export const actions = {
    default: async (event) => {
        const data = await event.request.formData();

        const result = parseResourceFromForm(data);

        const auth_user_id = await getAuthUserIdFromCookies(event.cookies, event.locals.auth);

        if (!result.valid || !result.data.owner_id) {
            return { success: false, message: 'Some values were not provided' };
        }

        await resourceRepository.create({ ...result.data, auth_user_id });

        return { success: true };
    },
} satisfies Actions;
