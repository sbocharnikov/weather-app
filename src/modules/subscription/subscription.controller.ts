import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from 'src/dto/createSubscription.dto';
import { HttpStatusCode } from 'axios';

@Controller()
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('subscribe')
  @HttpCode(HttpStatusCode.Ok)
  async createSubscription(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<string> {
    console.log(createSubscriptionDto);

    await this.subscriptionService.createSubscription(createSubscriptionDto);

    return 'Subscription successful. Confirmation email sent.';
  }
}
