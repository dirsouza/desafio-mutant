import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ContactRepository } from 'Domain/repositories';

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

describe('ContactRepository', () => {
  let contactRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactRepository],
    }).compile();

    contactRepository = await module.get<ContactRepository>(ContactRepository);
  });

  it('should repository be defined', () => {
    expect(contactRepository).toBeDefined();
  });

  describe('createContact', () => {
    it('should throw an error when trying to register a new contact', async () => {
      contactRepository.findOne = jest.fn();
      contactRepository.create = jest.fn();
      contactRepository.save = jest
        .fn()
        .mockRejectedValue(new InternalServerErrorException());

      expect(contactRepository.findOne).not.toBeCalled();
      expect(contactRepository.create).not.toBeCalled();
      expect(contactRepository.save).not.toBeCalled();
      await expect(
        contactRepository.createContact(mockContact),
      ).rejects.toThrow(InternalServerErrorException);
    });

    it('should return the contact if it already exists', async () => {
      contactRepository.findOne = jest.fn().mockResolvedValue(mockContact);

      const result = await contactRepository.createContact(mockContact);

      expect(contactRepository.findOne).toBeCalledTimes(1);
      expect(result).toEqual(mockContact);
    });

    it('should register a new contact successfully', async () => {
      contactRepository.findOne = jest.fn();
      contactRepository.create = jest.fn();
      contactRepository.save = jest.fn().mockResolvedValue(mockContact);

      const result = await contactRepository.createContact(mockContact);

      expect(contactRepository.findOne).toBeCalledTimes(1);
      expect(contactRepository.create).toBeCalledTimes(1);
      expect(contactRepository.save).toBeCalledTimes(1);
      expect(result).toEqual(mockContact);
    });
  });
});
