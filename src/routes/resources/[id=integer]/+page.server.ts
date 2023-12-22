import { resourceRepository } from '$lib/server/repositories/resource.repository';
import type { Resource } from '../../../lib/@types/resource';
import { parseResourceFromForm } from '../parseResourcesFromForm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
    return {
        resource: (await resourceRepository.findById(+event.params.id)) as Resource,
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
