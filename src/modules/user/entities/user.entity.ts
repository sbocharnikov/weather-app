import { Subscription } from 'src/modules/subscription/entities/subscription.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @OneToOne(() => Subscription, (subscription) => subscription.user)
  @JoinColumn()
  subscription: Subscription;
}
