import { error } from '@sveltejs/kit';
import { parseResourceFromForm } from '../../../lib/helpers/parseResourcesFromForm';
import type { Actions, PageServerLoad } from './$types';
import { subscriberRepository, userRepository } from '../../../lib/serviceLocator';
import { ResourceService } from '../../../lib/server/services/resource.service';

const resourceService = new ResourceService();

export const load: PageServerLoad = async (event) => {
    const resource = await resourceService.findById(+event.params.id, false);

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
            deleteSelected: 'subscriberTableDeleteSelected',
            edit: 'subscriberTableEdit',
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

        await resourceService.update(+event.params.id, result.data);

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

        await subscriberRepository.batchDelete(data);

        return {
            success: true,
            message: 'Successfully deleted',
        };
    },
    subscriberTableEdit: async (event) => {
        const formData = await event.request.formData();
        const data = JSON.parse(formData.get('data') as string);

        if (!data || typeof data !== 'object' || !data.id) {
            return {
                success: false,
                message: 'something went wronk',
            };
        }

        await subscriberRepository.update(data.id, data);

        return {
            success: true,
            message: 'Successfully updated',
        };
    },
    subscriberTableCreate: async (event) => {
        const formData = await event.request.formData();
        const data = JSON.parse(formData.get('data') as string);
        console.log(data);

        if (!data || typeof data !== 'object') {
            return {
                success: false,
                message: 'something went wronk',
            };
        }

        const result = await subscriberRepository.create(data);

        return {
            ...result,
        };
    },
} satisfies Actions;
