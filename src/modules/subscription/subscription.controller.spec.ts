import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';

const mockSubscriptionService = {
  createSubscription: jest.fn(),
  confirmSubscription: jest.fn(),
  unsubscribe: jest.fn(),
};

describe('SubscriptionController', () => {
  let controller: SubscriptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscriptionController],
      providers: [
        { provide: SubscriptionService, useValue: mockSubscriptionService },
      ],
    }).compile();

    controller = module.get<SubscriptionController>(SubscriptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
