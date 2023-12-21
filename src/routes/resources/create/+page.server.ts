import { resourceRepository } from '$lib/server/repositories/resource.repository';
import type { Actions } from '../$types';
import type { ResourceFrequency } from '../../../lib/database.types';

export const actions = {
    default: async (event) => {
        const data = await event.request.formData();

        const name = data.get('name') as string;
        const description = data.get('description') as string;
        const price = +(data.get('price') ?? 0);
        const frequency = data.get('frequency') as ResourceFrequency;

        if (!price || !name || !frequency) {
            return { success: false, message: 'Some values were not provided' };
        }

        await resourceRepository.create({ name, description, price, owner_id: 1, frequency });

        return { success: true };
    },
} satisfies Actions;
