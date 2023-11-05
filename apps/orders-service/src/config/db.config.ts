// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const DBConfig = {
  dbUrl: process.env.DB_URL,
};
