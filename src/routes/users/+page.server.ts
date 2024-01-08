import { userRepository } from '../../lib/serviceLocator';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    return {
        users: await userRepository.getAll(),
        tableActions: {
            deleteSelected: 'tableDeleteSelected',
        },
    };
};

export const actions = {
    tableDeleteSelected: async (event) => {
        const formData = await event.request.formData();
        const data = JSON.parse(formData.get('data') as string);

        if (!data || !Array.isArray(data) || !data.length) {
            return {
                success: true,
                message: 'something went wronk',
            };
        }

        await userRepository.batchDelete(data);

        return {
            success: false,
            message: 'Successfully deleted',
        };
    },
} satisfies Actions;
