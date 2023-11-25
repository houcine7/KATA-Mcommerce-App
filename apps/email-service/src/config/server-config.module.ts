import { Module } from '@nestjs/common';

import { ServerConfigService } from './server-config.service';
import { SCHEMA } from './config.constants';
import { Config } from './server-config.schema';

@Module({
  controllers: [],
  providers: [
    ServerConfigService,
    {
      provide: SCHEMA,
      useValue: Config,
    },
  ],
  exports: [ServerConfigService],
})
export class ServerConfigModule {}
