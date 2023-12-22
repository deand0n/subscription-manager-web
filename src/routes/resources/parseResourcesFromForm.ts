import type { Resource } from '../../lib/@types/resource';
import type { ResourceFrequency } from '../../lib/database.types';

type ParseResourceFromForm =
    | {
          valid: false;
      }
    | {
          valid: true;
          data: Pick<Resource, 'name' | 'description' | 'price' | 'frequency'>;
      };

export const parseResourceFromForm = (form: FormData): ParseResourceFromForm => {
    const name = form.get('name') as string;
    const description = form.get('description') as string;
    const price = +(form.get('price') ?? 0);
    const frequency = form.get('frequency') as ResourceFrequency;

    if (!price || !name || !frequency) {
        return { valid: false };
    }

    return { valid: true, data: { name, description, price, frequency } };
};
