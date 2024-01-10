import type { Cookies } from '@sveltejs/kit';
import { auth } from '../lucia';
import type { AuthRequest } from 'lucia';
import { goto } from '$app/navigation';
import { createLogger } from '../../logger/logger';

export const getAuthUserIdFromCookies = async (
    cookies: Cookies,
    authRequest: AuthRequest,
): Promise<string | never> => {
    const logger = createLogger();
    const session_id = cookies.get('auth_session');

    if (!session_id) {
        authRequest.invalidate();
        await goto('/login');

        logger.error('No session ID found');
        return 'NONE';
    }

    const session = await auth.getSession(session_id);

    return session.user.userId;
};
