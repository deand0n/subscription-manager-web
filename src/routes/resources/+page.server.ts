import { getAuthUserIdFromCookies } from '../../lib/server/helpers/getAuthUserFromCookies';
import { resourceRepository } from '../../lib/serviceLocator';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
    const auth_user_id = await getAuthUserIdFromCookies(event.cookies, event.locals.auth);

    return {
        resources: await resourceRepository.getAll(auth_user_id, false),
        tableActions: {
            deleteSelected: 'tableDeleteSelected',
        },
    };
};

export const actions = {
    tableDeleteSelected: async (event) => {
        const auth_user_id = await getAuthUserIdFromCookies(event.cookies, event.locals.auth);

        const formData = await event.request.formData();
        const data = JSON.parse(formData.get('data') as string);

        if (!data || !Array.isArray(data) || !data.length) {
            return {
                success: false,
                message: 'something went wronk',
            };
        }

        await resourceRepository.batchDelete(auth_user_id, data);

        return {
            success: true,
            message: 'Successfully deleted',
        };
    },
} satisfies Actions;
