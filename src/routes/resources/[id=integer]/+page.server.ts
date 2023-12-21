import { resourceRepository } from '$lib/server/repositories/resource.repository';
import type { ResourceFrequency } from '../../../lib/database.types';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
    return {
        resource: await resourceRepository.findById(+event.params.id),
    };
};

export const actions = {
    update: async (event) => {
        const data = await event.request.formData();

        const name = data.get('name') as string;
        const description = data.get('description') as string;
        const price = +(data.get('price') ?? 0);
        const frequency = data.get('frequency') as ResourceFrequency;

        if (!price || !name || !frequency) {
            return { success: false, message: 'Some values were not provided' };
        }

        await resourceRepository.update(+event.params.id, { name, description, price, frequency });

        return { success: true };
    },
} satisfies Actions;
