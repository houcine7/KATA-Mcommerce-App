import { Module } from '@nestjs/common';
import { DatabaseProviders } from './database.providers';

@Module({
  providers: [...DatabaseProviders],
})
export class DatabaseModule {}
