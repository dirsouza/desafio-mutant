import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from 'App/v1/controllers';
import { UserService } from 'Domain/services';

const mockGeo = {
  lat: 'any_lat',
  lng: 'any_lng',
};

const mockAddress = {
  id: 1,
  suite: 'any_suite',
  street: 'any_street',
  city: 'any_city',
  zipcode: 'any_zipcode',
  geo: mockGeo,
};

const mockCompany = {
  name: 'any_company',
  catchPhrase: 'any_catch_phrase',
  bs: 'any_bs',
};

const mockContact = {
  id: 1,
  email: 'any_email',
  phone: 'any_phone',
  website: 'any_website',
  companiy: mockCompany,
};

const mockUser = {
  id: 1,
  name: 'any_name',
  username: 'any_username',
  address: mockAddress,
  contact: mockContact,
};

const mockService = () => ({
  getUsers: jest.fn(),
  createUser: jest.fn(),
});

describe('UserController', () => {
  let userController;
  let userService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useFactory: mockService,
        },
      ],
    }).compile();

    userController = await module.get<UserController>(UserController);
    userService = await module.get<UserService>(UserService);
  });

  it('should controller and service be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('findUsers()', () => {
    it('should throw an error when trying to return a list of users', async () => {
      userService.getUsers.mockRejectedValue(
        new InternalServerErrorException(),
      );

      await expect(userController.findUsers()).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('should return a list of users', async () => {
      userService.getUsers.mockReturnValue([mockUser]);

      const result = userController.findUsers();

      expect(userService.getUsers).toHaveBeenCalledTimes(1);
      expect(result).toEqual([mockUser]);
    });
  });

  describe('create()', () => {
    it('should throw an error when trying to register new users', async () => {
      userService.createUser.mockRejectedValue(
        new InternalServerErrorException(),
      );

      await expect(userController.create({})).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('should register new users', async () => {
      userService.createUser.mockResolvedValue([mockUser]);

      const result = await userController.create([mockUser]);

      expect(userService.createUser).toHaveBeenCalledTimes(1);
      expect(result).toEqual([mockUser]);
    });
  });
});
