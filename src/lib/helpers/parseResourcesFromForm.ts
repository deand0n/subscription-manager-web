import type { Resource } from '../@types/resource';
import type { ResourceFrequency } from '../database.types';

type ParseResourceFromForm =
    | {
          valid: false;
      }
    | {
          valid: true;
          data: Pick<
              Resource,
              'name' | 'description' | 'price' | 'frequency' | 'billing_start' | 'owner_id'
          >;
      };

export const parseResourceFromForm = (form: FormData): ParseResourceFromForm => {
    const name = form.get('name') as string;
    const description = form.get('description') as string;
    const price = +(form.get('price') ?? 0);
    const frequency = form.get('frequency') as ResourceFrequency;
    const billing_start = form.get('billing_start') as string;
    const owner_id = +(form.get('owner_id') ?? 0);

    if (!price || !name || !frequency || !billing_start || !owner_id) {
        return { valid: false };
    }

    return { valid: true, data: { name, description, price, frequency, billing_start, owner_id } };
};
