import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Test } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';

describe('Cats Controller', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeAll(async () => {
    const moudleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersService = moudleRef.get<UsersService>(UsersService);
    usersController = moudleRef.get<UsersController>(UsersController);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result: CreateUserDto[] = [
        {
          name: 'test',
          family: 'test',
          age: 20,
        },
        {
          name: 'test',
          family: 'test',
          age: 20,
        },
      ];
      jest.spyOn(usersService, 'findAll').mockImplementation(() => result);
      expect(await usersController.findAll()).toBe(result);
    });
  });
});
