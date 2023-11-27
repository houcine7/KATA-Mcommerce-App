import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitmqEmailService {
  //
  constructor(
    @Inject('RABBIT_MQ_SERVICE') private readonly client: ClientProxy,
  ) {}

  //
  public sendVerificationEmail({
    pattern,
    data,
  }: {
    pattern: string;
    data: any;
  }) {
    //

    console.log('pattern', pattern);
    return this.client.send(pattern, data).subscribe({
      next: (result) => {
        console.log('result', result);
      },
      error: (error) => {
        console.log('error', error);
      },
      complete: () => {
        console.log('completed');
      },
    });
  }
}
