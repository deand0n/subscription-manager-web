import type { RequestHandler } from '@sveltejs/kit';
import { resourceRepository } from '../../../../lib/server/repositories/resource.repository';

export const PUT: RequestHandler = async (event) => {
    const resources = await event.request.json();

    if (!resources || !Array.isArray(resources) || !resources.length) {
        return new Response(
            JSON.stringify({
                message: 'something went wronk',
            }),
            { status: 400 },
        );
    }

    await resourceRepository.batchDelete(resources);

    return new Response(
        JSON.stringify({
            message: 'Successfully deleted',
        }),
        { status: 200 },
    );
};
