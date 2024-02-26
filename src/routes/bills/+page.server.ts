import { billRepository } from "$lib/serviceLocator";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    return {
        bills: await billRepository.getAll(),
    };
};