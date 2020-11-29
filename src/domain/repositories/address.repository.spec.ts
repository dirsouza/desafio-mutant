import { Test, TestingModule } from '@nestjs/testing';
import { AddressRepository } from 'Domain/repositories';
import { InternalServerErrorException } from '@nestjs/common';

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

describe('AddressRepository', () => {
  let addressRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressRepository],
    }).compile();

    addressRepository = await module.get<AddressRepository>(AddressRepository);
  });

  it('should repository be defined', () => {
    expect(addressRepository).toBeDefined();
  });

  describe('createAddress', () => {
    it('should throw an error when trying to register a new address', async () => {
      addressRepository.create = jest.fn();
      addressRepository.save = jest
        .fn()
        .mockRejectedValue(new InternalServerErrorException());

      expect(addressRepository.create).not.toBeCalled();
      expect(addressRepository.save).not.toBeCalled();
      await expect(
        addressRepository.createAddress(mockAddress),
      ).rejects.toThrow(InternalServerErrorException);
    });

    it('should register a new address successfully', async () => {
      addressRepository.create = jest.fn();
      addressRepository.save = jest.fn().mockResolvedValue(mockAddress);

      const result = await addressRepository.createAddress(mockAddress);

      expect(addressRepository.create).toBeCalledTimes(1);
      expect(addressRepository.save).toBeCalledTimes(1);
      expect(result).toEqual(mockAddress);
    });
  });
});
