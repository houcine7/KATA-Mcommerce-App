import { Inject } from '@nestjs/common';
import { getEmailInstanceToken } from './email-service.constants';

export const InjectEmailTransport = () => Inject(getEmailInstanceToken());
