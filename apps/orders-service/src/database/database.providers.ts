import * as mongoose from 'mongoose';
import { DBConfig } from '../config/db.config';

export const DatabaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(DBConfig.dbUrl),
  },
];
