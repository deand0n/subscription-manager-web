import type { User } from '../@types/user';

type ParseUserFromForm =
    | {
          valid: false;
      }
    | {
          valid: true;
          data: Pick<User, 'first_name' | 'last_name' | 'description'>;
      };

export const parseUserFromForm = (form: FormData): ParseUserFromForm => {
    const first_name = form.get('first_name') as string;
    const last_name = form.get('last_name') as string;
    const description = form.get('description') as string;

    if (!first_name || !last_name) {
        return { valid: false };
    }

    return { valid: true, data: { first_name, last_name, description } };
};
