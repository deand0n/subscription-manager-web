import { resourceRepository } from '$lib/server/repositories/resource.repository';
import { error } from '@sveltejs/kit';
import { parseResourceFromForm } from '../../../lib/helpers/parseResourcesFromForm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
    const resource = await resourceRepository.findById(+event.params.id, false);

    if (!resource) {
        error(404, {
            message: 'Not found',
        });
    }

    resource.subscribers ??= [];

    return {
        resource,
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
} satisfies Actions;
