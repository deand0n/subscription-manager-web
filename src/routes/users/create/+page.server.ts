import type { Actions } from '../$types';
import { getAuthUserIdFromCookies } from '../../../lib/server/helpers/getAuthUserFromCookies';
import { userRepository } from '../../../lib/serviceLocator';

export const actions = {
    default: async (event) => {
        const data = await event.request.formData();

        const first_name = data.get('first_name') as string;
        const last_name = data.get('last_name') as string;
        const description = data.get('description') as string;
        const telegram_user_id = data.get('telegram_user_id') as string;

        const auth_user_id = await getAuthUserIdFromCookies(event.cookies, event.locals.auth);

        if (!first_name || !last_name) {
            return { success: false, message: 'Some values were not provided' };
        }

        await userRepository.create({
            first_name,
            last_name,
            description,
            telegram_user_id,
            auth_user_id,
        });

        return { success: true };
    },
} satisfies Actions;
