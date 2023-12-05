// export default {
//     entities: [Author, Book, BookTag], // no need for `entitiesTs` this way
//     dbName: 'my-db-name',
//     type: 'postgresql', // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
// };


import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Subscription } from './server/entities/subscription.entity';
import { User } from './server/entities/user.entity';
import { Subscriber } from './server/entities/subscriber.entity';
import { TSMigrationGenerator } from '@mikro-orm/migrations';


const entities = [
    Subscriber,
    Subscription,
    User
]

export default {
    metadataProvider: TsMorphMetadataProvider,
    entities: entities,
    dbName: 'postgres',
    type: 'postgresql',
    schema: 'subscription_manager',
    migrations: {
        tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
        path: './migrations', // path to the folder with migrations
        pathTs: '*.d.ts', // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
        glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
        transactional: true, // wrap each migration in a transaction
        disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
        allOrNothing: true, // wrap all migrations in master transaction
        dropTables: true, // allow to disable table dropping
        safe: false, // allow to disable table and column dropping
        snapshot: true, // save snapshot when creating new migrations
        emit: 'ts', // migration generation mode
        generator: TSMigrationGenerator,
    }
}

console.log(1)