// import { MikroORM, type PostgreSqlDriver } from '@mikro-orm/postgresql'; // or any other driver package
// import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
// import { Subscription } from './lib/server/entities/subscription.entity';
// import { Subscriber } from './lib/server/entities/subscriber.entity';
// import { User } from './lib/server/entities/user.entity';


// const entities = [
//     Subscriber,
//     Subscription,
//     User
// ]

// const orm = await MikroORM.init<PostgreSqlDriver>({
//     metadataProvider: TsMorphMetadataProvider,
//     entities: entities,
//     dbName: 'postgres',
//     type: 'postgresql',
//     schema: 'subscription_manager',
// });

// const migrator = orm.getMigrator()
// await migrator.createMigration()
// await migrator.up()

// console.log(1)