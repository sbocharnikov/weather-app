import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SubscriptionFrequency } from '../subscription-frequency.enum';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.subscription)
  user: User;

  @Column()
  city: string;

  @Column({
    type: 'enum',
    enum: SubscriptionFrequency,
  })
  frequency: SubscriptionFrequency;

  @Column()
  token: string;

  @Column({ default: false })
  confirmed: boolean;
}
