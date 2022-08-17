import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

describe('Users Controller', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const moudleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: {},
        },
      ],
    }).compile();

    usersService = moudleRef.get<UsersService>(UsersService);
    usersController = moudleRef.get<UsersController>(UsersController);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [
        {
          name: 'test1',
          family: 'test1',
          age: 21,
        },
        {
          name: 'test2',
          family: 'test2',
          age: 22,
        },
      ];

      jest
        .spyOn(usersService, 'findAll')
        .mockImplementation(async () => result);

      expect(await usersController.findAll()).toBe(result);
    });
  });
  describe('findOne user by id', () => {
    it('should return an user', async () => {
      const result = {
        name: 'test1',
        family: 'test1',
        age: 21,
      };

      jest
        .spyOn(usersService, 'findOne')
        .mockImplementation(async () => result);

      expect(await usersController.findOne('test1')).toBe(result);
    });
  });
});
