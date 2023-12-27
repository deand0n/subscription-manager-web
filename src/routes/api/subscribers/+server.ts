import type { RequestHandler } from '@sveltejs/kit';
import { subscriberRepository } from '../../../lib/server/repositories/subscriber.repository';

export const POST: RequestHandler = async (event) => {
    const subscriber = await event.request.json();

    if (!subscriber || typeof subscriber !== 'object') {
        return new Response(
            JSON.stringify({
                message: 'something went wronk',
            }),
            { status: 400 },
        );
    }

    const result = await subscriberRepository.create(subscriber);

    return new Response(
        JSON.stringify({
            ...result,
        }),
        { status: 200 },
    );
};
