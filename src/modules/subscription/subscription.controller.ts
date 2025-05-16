import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from 'src/modules/subscription/dto/createSubscription.dto';
import { HttpStatusCode } from 'axios';

@Controller()
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('subscribe')
  @HttpCode(HttpStatusCode.Ok)
  async createSubscription(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<string> {
    await this.subscriptionService.createSubscription(createSubscriptionDto);

    return 'Subscription successful. Confirmation email sent.';
  }

  @Get('confirm/:token')
  async confirmSubscription(@Param('token') token: string) {
    await this.subscriptionService.confirmSubscription(token);

    return 'Subscription confirmed successfully';
  }

  @Get('unsubscribe/:token')
  async unsubscribe(@Param('token') token: string) {
    await this.subscriptionService.unsubscribe(token);

    return 'Unsubscribed successfully';
  }
}
