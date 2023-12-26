import type { RequestHandler } from '@sveltejs/kit';
import { userRepository } from '../../../../lib/server/repositories/user.repository';

export const PUT: RequestHandler = async (event) => {
    const users = await event.request.json();

    if (!users || !Array.isArray(users) || !users.length) {
        return new Response(
            JSON.stringify({
                message: 'something went wronk',
            }),
            { status: 400 },
        );
    }

    await userRepository.batchDelete(users);

    return new Response(
        JSON.stringify({
            message: 'Successfully deleted',
        }),
        { status: 200 },
    );
};
