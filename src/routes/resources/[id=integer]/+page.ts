import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = (event) => {
    if (!event.data.resource) {
        redirect(300, '/resources');
    }

    return {
        id: event.params.id,
        resource: event.data.resource,
    };
};
