import type { RequestHandler } from '@sveltejs/kit';
import { subscriberRepository } from '../../../../lib/server/repositories/subscriber.repository';

export const PUT: RequestHandler = async (event) => {
    const subscribers = await event.request.json();

    if (!subscribers || !Array.isArray(subscribers) || !subscribers.length) {
        return new Response(
            JSON.stringify({
                message: 'something went wronk',
            }),
            { status: 400 },
        );
    }

    await subscriberRepository.batchDelete(subscribers);

    return new Response(
        JSON.stringify({
            message: 'Successfully deleted',
        }),
        { status: 200 },
    );
};
