import { Inject, Injectable } from '@nestjs/common';
import { Output, safeParse } from 'valibot';

import { SCHEMA } from './config.constants';
import { Config } from './server-config.schema';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class ServerConfigService {
  private readonly config: Output<typeof Config>;

  constructor(@Inject(SCHEMA) schema: typeof Config) {
    const result = safeParse(schema, process.env);

    if (!result.success) {
      console.log(result);
      throw new Error("Validation didn't pass");
    }
    this.config = result.output;
  }

  get<T extends keyof Output<typeof Config>>(key: T): Output<typeof Config>[T] {
    return this.config[key];
  }
}
