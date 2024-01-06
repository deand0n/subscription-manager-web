import { Telegraf } from 'telegraf';
import type { Bill } from '../../@types/bill';
import { createLogger } from '../../logger/logger';
import type { BillSubscriber } from '../../@types/bill_subscriber';
import { FmtString, bold, fmt, join, mention } from 'telegraf/format';
import { format } from 'date-fns';

// bot.writeBillMessage(resource)

// bot handle billing

// import { Telegraf } from 'telegraf';
// import { message } from 'telegraf/filters';

// const bot = new Telegraf('1672786429:AAFrgX-g2lOWMLIP0AbKjpBTBoAMHVP_2S0');
// bot.start((ctx) => ctx.reply('Welcome'));
// bot.help((ctx) => ctx.reply('Send me a sticker'));
// bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
// bot.hears('hi', (ctx) => ctx.reply('Hey there'));
// bot.launch();

// // Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));

// console.log(123);

class TelegramBot {
    private logger = createLogger('Bot');
    private bot = new Telegraf('6759620634:AAHkLHioC0GyiWodHM-U2Ds9MngiF9g3BpI');

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

        // this.bot.telegram.message
        this.bot.telegram.sendMessage(telegram_group_id, result);
        // this.bot.telegram.sendMessage(telegram_group_id, fmt`${mention('Vlad', 709314547)}}`);

        // this.bot.telegram.sendMessage('-4078774566', 'FIRST TEST MESSAGE');
        // this.bot.action();
        // get resource telegram group_id
        // get all subscribers and corresponding users
        // write message, should include subscriber, mentioned user, price to pay
        // ex.:
        // Vlad Kopylets - 200uah
        // Vlad Kopylets (brother) - 200uah
        // etc

        console.log('resource');
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
