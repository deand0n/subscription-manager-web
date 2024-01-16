import { error } from '@sveltejs/kit';
import { parseUserFromForm } from '$lib/helpers/parseUserFromForm';
import type { Actions, PageServerLoad } from './$types';
import { userRepository } from '$lib/serviceLocator';
import { getAuthUserIdFromCookies } from '$lib/server/helpers/getAuthUserFromCookies';

export const load: PageServerLoad = async (event) => {
    const auth_user_id = await getAuthUserIdFromCookies(event.cookies, event.locals.auth);

    const user = await userRepository.findById(auth_user_id, +event.params.id);

    if (!user) {
        error(404, {
            message: 'Not found',
        });
    }

    return {
        user,
    };
};

export const actions = {
    update: async (event) => {
        const auth_user_id = await getAuthUserIdFromCookies(event.cookies, event.locals.auth);

        const data = await event.request.formData();

        const result = parseUserFromForm(data);

        if (!result.valid) {
            return { success: false, message: 'Some values were not provided' };
        }

        await userRepository.update(auth_user_id, +event.params.id, result.data);

        return { success: true };
    },
} satisfies Actions;
