import type { Resource } from '../@types/resource';
import type { ResourceFrequency } from '../database.types';

type ParseResourceFromForm =
    | {
          valid: false;
      }
    | {
          valid: true;
          data: Pick<Resource, 'name' | 'description' | 'price' | 'frequency' | 'billed_at'>;
      };

export const parseResourceFromForm = (form: FormData): ParseResourceFromForm => {
    const name = form.get('name') as string;
    const description = form.get('description') as string;
    const price = +(form.get('price') ?? 0);
    const frequency = form.get('frequency') as ResourceFrequency;
    const billed_at = form.get('billed_at') as string;

    if (!price || !name || !frequency) {
        return { valid: false };
    }

    return { valid: true, data: { name, description, price, frequency, billed_at } };
};
