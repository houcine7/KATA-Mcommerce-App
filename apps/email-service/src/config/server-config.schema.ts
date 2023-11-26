import { join } from 'path';
import {
  email,
  enumType,
  fallback,
  merge,
  object,
  optional,
  string,
  transform,
} from 'valibot';

const devConfig = object({
  NODE_ENV: enumType(['development', 'test'], 'test'),
  NOREPLY_EMAIL: optional(string([email()])),
  SMTP_PASS: optional(string()),
  SMTP_HOST: optional(string()),
  FILE_PATH: fallback(
    string(),
    join(process.cwd(), 'apps', 'site', 'public', 'images'),
  ),
});

// const rabbitConfig = object({
//   RABBIT_USER: string(),
//   RABBIT_PASSWORD: string(),
//   RABBIT_HOST: string(),
//   RABBIT_PORT: string(),
// });

const commonConfig = object({
  CORS: fallback(string(), 'http://localhost:3001'),
});

export const Config = merge([devConfig, commonConfig]);
