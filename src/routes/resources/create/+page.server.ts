import { resourceRepository } from '$lib/server/repositories/resource.repository';
import type { Actions } from '../$types';

export const actions = {
    default: async (event) => {
        const data = await event.request.formData();

        const name = data.get('name') as string;
        const description = data.get('description') as string;
        const price = +(data.get('price') ?? 0);

        if (!price || !name) {
            return { success: false, message: 'Some values were not provided' };
        }

        await resourceRepository.create({ name, description, price, owner_id: 1 });

        return { success: true };
    },
} satisfies Actions;
