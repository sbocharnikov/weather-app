import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSubscriptionDto } from 'src/modules/subscription/dto/createSubscription.dto';
import { Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/modules/user/user.service';
import { randomUUID } from 'node:crypto';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
    private userService: UserService,
  ) {}

  async createSubscription(
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<void> {
    console.log(2);
    const { email } = createSubscriptionDto;
    let user = await this.userService.getByEmail(email);

    if (user) {
      throw new HttpException('Email already subscribed', HttpStatus.CONFLICT);
    }

    user = await this.userService.createUser({ email });

    const token = randomUUID();

    const subscription = this.subscriptionRepository.create({
      ...createSubscriptionDto,
      user,
      token,
    });

    await this.subscriptionRepository.save(subscription);

    console.log(3);
  }
}
