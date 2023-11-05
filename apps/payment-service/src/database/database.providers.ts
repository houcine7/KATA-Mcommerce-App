import * as mongoose from 'mongoose';
import { dbConfig } from 'src/config/db.conf';

export const DatabaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(dbConfig.dbURL),
  },
];
