import { Test, TestingModule } from '@nestjs/testing';
import { HttpService, InternalServerErrorException } from '@nestjs/common';
import {
  UserRepository,
  AddressRepository,
  ContactRepository,
} from 'Domain/repositories';
import { UserService } from 'Domain/services';

const mockUser = {
  id: 1,
  name: 'any_name',
  username: 'any_username',
  address_id: 1,
  contact_id: 1,
  createdAt: new Date(),
};

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
  createdAt: new Date(),
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
  createdAt: new Date(),
};

const mockJson = {
  ...mockUser,
  address: mockAddress,
  contact: mockContact,
};

const mockUserRepository = () => ({
  createUser: jest.fn(),
});

const mockAddressRepository = () => ({
  createAddress: jest.fn(),
});

const mockContactRepository = () => ({
  createContact: jest.fn(),
});

const mockHttpService = () => ({
  get: jest.fn(),
});

describe('UserService', () => {
  let userService;
  let userRespository;
  let addressRepository;
  let contactRepository;
  let httpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useFactory: mockUserRepository,
        },
        {
          provide: AddressRepository,
          useFactory: mockAddressRepository,
        },
        {
          provide: ContactRepository,
          useFactory: mockContactRepository,
        },
        {
          provide: HttpService,
          useFactory: mockHttpService,
        },
      ],
    }).compile();

    userService = await module.get<UserService>(UserService);
    userRespository = await module.get<UserRepository>(UserRepository);
    addressRepository = await module.get<AddressRepository>(AddressRepository);
    contactRepository = await module.get<ContactRepository>(ContactRepository);
    httpService = await module.get<HttpService>(HttpService);
  });

  it('should service and repositories must be defined', () => {
    expect(userService).toBeDefined();
    expect(userRespository).toBeDefined();
    expect(addressRepository).toBeDefined();
    expect(contactRepository).toBeDefined();
  });

  describe('getUsers()', () => {
    it('should throw an error when trying to return a list of users', async () => {
      httpService.get.mockReturnValue({
        toPromise: jest
          .fn()
          .mockRejectedValue(new InternalServerErrorException()),
      });

      await expect(userService.getUsers()).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('should return a list of users', async () => {
      httpService.get.mockReturnValue({
        toPromise: jest.fn().mockResolvedValue([mockJson]),
      });

      const result = await userService.getUsers();

      expect(httpService.get).toHaveBeenCalledTimes(1);
      expect(result).toEqual([mockJson]);
    });
  });

  describe('createUser()', () => {
    it('should throw an error when creating the address when trying to register a new user', async () => {
      addressRepository.createAddress.mockRejectedValue(
        new InternalServerErrorException(),
      );

      await expect(userService.createUser([mockUser])).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('should throw an error when creating the contact when trying to register a new user', async () => {
      addressRepository.createAddress.mockResolvedValue(mockAddress);
      contactRepository.createContact.mockRejectedValue(
        new InternalServerErrorException(),
      );

      await expect(userService.createUser([mockUser])).rejects.toThrow(
        new InternalServerErrorException(),
      );
    });

    it('should throw an error when trying to register a new user', async () => {
      addressRepository.createAddress.mockResolvedValue(mockAddress);
      contactRepository.createContact.mockResolvedValue(mockContact);
      userRespository.createUser.mockRejectedValue(
        new InternalServerErrorException(),
      );

      await expect(userService.createUser([mockUser])).rejects.toThrow(
        new InternalServerErrorException(),
      );
    });

    it('should register a new user successfully', async () => {
      addressRepository.createAddress.mockResolvedValue(mockAddress);
      contactRepository.createContact.mockResolvedValue(mockContact);
      userRespository.createUser.mockResolvedValue(mockUser);

      const result = await userService.createUser([mockUser]);

      expect(result).toEqual([mockUser]);
    });
  });
});
