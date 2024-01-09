import { error } from '@sveltejs/kit';
import { parseResourceFromForm } from '../../../lib/helpers/parseResourcesFromForm';
import type { Actions, PageServerLoad } from './$types';
import { resourceRepository, userRepository } from '../../../lib/serviceLocator';

export const load: PageServerLoad = async (event) => {
    const resource = await resourceRepository.findById(+event.params.id, false);

    if (!resource) {
        error(404, {
            message: 'Not found',
        });
    }

    resource.subscribers ??= [];
    const users = await userRepository.getAll();

    return {
        resource,
        users,
        formActionNames: {
            create: 'subscriberTableCreate',
        },
    };
};

export const actions = {
    update: async (event) => {
        const data = await event.request.formData();

        const result = parseResourceFromForm(data);

        if (!result.valid) {
            return { success: false, message: 'Some values were not provided' };
        }

        await resourceRepository.update(+event.params.id, result.data);

        return { success: true };
    },
    subscriberTableDeleteSelected: async (event) => {
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
    subscriberTableEdit: async (event) => {
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
    subscriberTableCreate: async (event) => {
        const formData = await event.request.formData();
        const data = JSON.parse(formData.get('data') as string);
        console.log(data);

        if (!data || !Array.isArray(data) || !data.length) {
            return {
                success: false,
                message: 'something went wronk',
            };
        }

        // await resourceRepository.batchDelete(data);

        return {
            success: true,
            message: 'Successfully deleted',
        };
    },
} satisfies Actions;

// export const actions = {
//     tableDeleteSelected: async (event) => {
//         const formData = await event.request.formData();
//         const data = JSON.parse(formData.get('data') as string);

//         if (!data || !Array.isArray(data) || !data.length) {
//             return {
//                 success: false,
//                 message: 'something went wronk',
//             };
//         }

//         await resourceRepository.batchDelete(data);

//         return {
//             success: true,
//             message: 'Successfully deleted',
//         };
//     },
// } satisfies Actions;
