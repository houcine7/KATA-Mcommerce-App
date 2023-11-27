import { IJwt } from './jwt-config.interface';

export interface IConfig {
  id: string;
  port: number;
  domain: string;
  jwt: IJwt;
}
