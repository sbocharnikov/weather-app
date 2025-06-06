import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { SubscriptionFrequency } from '../subscription-frequency.enum';

export class CreateSubscriptionDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  city: string;

  @IsEnum(SubscriptionFrequency)
  frequency: SubscriptionFrequency;
}
