import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSubscriptionDto } from './dto/createSubscription.dto';
import { Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { randomUUID } from 'node:crypto';
import { isUUID } from 'class-validator';

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
  }

  async confirmSubscription(token: string): Promise<void> {
    if (!isUUID(token)) {
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
    }

    const subscription = await this.subscriptionRepository.findOne({
      where: { token },
    });

    if (!subscription) {
      throw new HttpException('Token not found', HttpStatus.NOT_FOUND);
    }

    subscription.confirmed = true;
    await this.subscriptionRepository.update(subscription.id, subscription);
  }

  async unsubscribe(token: string): Promise<void> {
    if (!isUUID(token)) {
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
    }

    const subscription = await this.subscriptionRepository.findOne({
      where: { token },
      relations: ['user'],
    });

    if (!subscription) {
      throw new HttpException('Token not found', HttpStatus.NOT_FOUND);
    }

    await this.userService.deleteUser(subscription.user.id);
    await this.subscriptionRepository.delete(subscription.id);
  }
}
