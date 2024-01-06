import { Telegraf } from 'telegraf';
import type { Bill } from '../../@types/bill';
import { createLogger } from '../../logger/logger';
import type { BillSubscriber } from '../../@types/bill_subscriber';
import { FmtString, bold, fmt, join, mention } from 'telegraf/format';
import { format } from 'date-fns';

class TelegramBot {
    private logger = createLogger('Bot');
    private bot = new Telegraf(import.meta.env.VITE_TELEGRAM_BOT_TOKEN);

    constructor() {
        this.bot.catch((err) => {
            this.logger.error('CRITICAL BOT ERROR: ' + JSON.stringify(err as string));
        });
    }

    writeBillMessage(
        telegram_group_id: string,
        resource_name: string,
        bill: Bill,
        billSubscribers?: BillSubscriber[],
    ) {
        this.logger.log(`Started writeBillMessage for telegram_group_id: ${telegram_group_id}`);

        const title = bold(resource_name);
        const subTitle = `Billing from ${format(bill.created_at, 'yyyy-MM-dd')}`;
        const priceMessage = `Total amount: ${bill.full_amount} uah`;

        const subMessage = billSubscribers?.length
            ? this.getBillSubscribersMessage(billSubscribers)
            : 'No subscribers found';

        const result = join([title, subTitle, priceMessage, subMessage], '\n\n');

        this.logger.debug(`WriteBillMessage result:\n${JSON.stringify(result)}`);

        this.bot.telegram.sendMessage(telegram_group_id, result);
    }

    private getBillSubscribersMessage(billSubscribers: BillSubscriber[]) {
        const subMessages = billSubscribers.map((bs, i): FmtString | string => {
            if (!bs.subscriber?.user) {
                this.logger.error(`User not found from bill_subscriber "${bs.id}"`);
                return `USER_NOT_FOUND: ${bs.amount}`;
            }

            const user = bs.subscriber?.user;

            const index = bold(`${i + 1}.`);

            let userName: string | FmtString = `${user.first_name} ${user.last_name}`;
            if (user.telegram_user_id) {
                userName = mention(`${user.first_name} ${user.last_name}`, +user.telegram_user_id);
            }

            const subscriberDescription = bs.subscriber.description
                ? ` (${bs.subscriber.description})`
                : '';
            const amount = `${bs.amount} uah`;

            return fmt`${index} ${userName}${subscriberDescription}: ${amount}`;
        });

        return join(subMessages, '\n');
    }
}

export const bot = new TelegramBot();
