// import { resourceRepository } from '$lib/server/repositories/resource.repository';
// import type { Actions } from '../$types';
// import { parseResourceFromForm } from '../parseResourcesFromForm';

// export const actions = {
//     default: async (event) => {
//         const data = await event.request.formData();

//         const result = parseResourceFromForm(data);

//         if (!result.valid) {
//             return { success: false, message: 'Some values were not provided' };
//         }

//         await resourceRepository.create({ ...result.data, owner_id: 1 });

//         return { success: true };
//     },
// } satisfies Actions;
console.log('tests');
