import { BillRepository } from './server/repositories/bill.repository';
import { BillSubscriberRepository } from './server/repositories/bill_subscriber.repository';
import { ResourceRepository } from './server/repositories/resource.repository';
import { SubscriberRepository } from './server/repositories/subscriber.repository';
import { UserRepository } from './server/repositories/user.repository';

export const billRepository = new BillRepository();
export const billSubscriberRepository = new BillSubscriberRepository();
export const resourceRepository = new ResourceRepository();
export const subscriberRepository = new SubscriberRepository();
export const userRepository = new UserRepository();

console.log('test1');
