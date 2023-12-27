import type { RequestHandler } from '@sveltejs/kit';
import { userRepository } from '../../../lib/server/repositories/user.repository';

export const GET: RequestHandler = async () => {
    const users = await userRepository.getAll();

    return new Response(
        JSON.stringify({
            users,
        }),
        { status: 200 },
    );
};
