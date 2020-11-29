import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from 'Domain/repositories';

const mockUser = {
  id: 1,
  name: 'any_name',
  username: 'any_username',
  address_id: 1,
  contact_id: 1,
  createdAt: new Date(),
};

describe('UserRepository', () => {
  let userRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();

    userRepository = await module.get<UserRepository>(UserRepository);
  });

  it('should repository be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('createUser', () => {
    it('should throw an error when trying to register a new user', async () => {
      userRepository.create = jest.fn();
      userRepository.save = jest
        .fn()
        .mockRejectedValue(new InternalServerErrorException());

      expect(userRepository.create).not.toBeCalled();
      expect(userRepository.save).not.toBeCalled();
      await expect(userRepository.createUser(mockUser)).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('should register a new user successfully', async () => {
      userRepository.create = jest.fn();
      userRepository.save = jest.fn().mockResolvedValue(mockUser);

      const result = await userRepository.createUser(mockUser);

      expect(userRepository.create).toBeCalledTimes(1);
      expect(userRepository.save).toBeCalledTimes(1);
      expect(result).toEqual(mockUser);
    });
  });
});
