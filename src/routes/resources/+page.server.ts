import { resourceRepository } from '../../lib/serviceLocator';
import type { PageServerLoad } from './$types';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    return {
        resources: await resourceRepository.getAll(false),
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
                success: false,
                message: 'something went wronk',
            };
        }

        await resourceRepository.batchDelete(data);

        return {
            success: true,
            message: 'Successfully deleted',
        };
    },
} satisfies Actions;
