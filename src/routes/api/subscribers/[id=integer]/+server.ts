import type { RequestHandler } from '@sveltejs/kit';
import { subscriberRepository } from '../../../../lib/server/repositories/subscriber.repository';
import type { SubscriberUpdateable } from '../../../../lib/database.types';

export const PUT: RequestHandler = async (event) => {
    const subscriber: SubscriberUpdateable = await event.request.json();

    const id = event.params.id && +event.params.id;
    if (!id || !subscriber || typeof subscriber !== 'object') {
        return new Response(
            JSON.stringify({
                message: 'something went wronk',
            }),
            { status: 400 },
        );
    }

    await subscriberRepository.update(id, subscriber);

    return new Response(
        JSON.stringify({
            message: 'Success',
        }),
        { status: 200 },
    );
};
