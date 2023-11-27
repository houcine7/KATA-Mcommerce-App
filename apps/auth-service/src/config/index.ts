import { readFileSync } from 'fs';
import { IConfig } from './config.interface';
import { join } from 'path';

export function config(): IConfig {
  const publicKey = readFileSync(
    join(process.cwd(), 'keys/public.key'),
    'utf-8',
  );
  const privateKey = readFileSync(
    join(process.cwd(), 'keys/private.key'),
    'utf-8',
  );

  return {
    id: process.env.APP_ID,
    port: parseInt(process.env.PORT, 10),
    domain: process.env.DOMAIN,
    jwt: {
      access: {
        privateKey,
        publicKey,
        time: parseInt(process.env.JWT_ACCESS_TIME, 10),
      },
      confirmation: {
        secret: process.env.JWT_CONFIRMATION_SECRET,
        time: parseInt(process.env.JWT_CONFIRMATION_TIME, 10),
      },
      resetPassword: {
        secret: process.env.JWT_RESET_PASSWORD_SECRET,
        time: parseInt(process.env.JWT_RESET_PASSWORD_TIME, 10),
      },
      refresh: {
        secret: process.env.JWT_REFRESH_SECRET,
        time: parseInt(process.env.JWT_REFRESH_TIME, 10),
      },
    },
  };
}
