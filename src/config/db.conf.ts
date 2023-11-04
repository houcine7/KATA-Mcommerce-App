// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const dbConfig = {
  dbURL: process.env.DB_URL,
};
