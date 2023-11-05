import { env } from 'process';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const AppConfig = {
  port: env.APP_PORT,
  url: `0.0.0.0:5000`,
};

export const PRODUCT_SERVICE_URL = env.PRODUCT_SERVICE_URL;
