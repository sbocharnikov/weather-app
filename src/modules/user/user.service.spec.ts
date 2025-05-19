import { TestingModule, Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

const mockUserRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto = { email: 'test@test.com' };
    const user = {
      id: '1',
      email: 'test@test.com',
      subscription: {},
    };

    jest.spyOn(mockUserRepository, 'create').mockReturnValue(user);
    jest.spyOn(mockUserRepository, 'save').mockReturnValue(user);

    const result = await service.createUser(createUserDto);

    expect(mockUserRepository.create).toHaveBeenCalledWith(createUserDto);
    expect(mockUserRepository.save).toHaveBeenCalledWith(user);
    expect(result).toEqual(user);
  });

  it('should delete a user', async () => {
    const id = '1';
    jest.spyOn(mockUserRepository, 'delete');
    await service.deleteUser(id);

    expect(mockUserRepository.delete).toHaveBeenCalledWith(id);
  });

  it('should get a user by email', async () => {
    const email = 'test@test.com';
    const user = { id: '1', email: 'test@test.com', subscription: {} };
    jest.spyOn(mockUserRepository, 'findOne').mockReturnValue(user);
    const result = await service.getByEmail(email);
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      where: { email },
    });
    expect(result).toEqual(user);
  });
});
