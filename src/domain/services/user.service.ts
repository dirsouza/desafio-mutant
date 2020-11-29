import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address, Contact, User } from 'Domain/entities';
import { AxiosResponse } from 'axios';
import {
  AddressRepository,
  ContactRepository,
  UserRepository,
} from 'Domain/repositories';
import {
  AddressDto,
  ContactDto,
  JsonplaceholderDto,
  UserDto,
} from 'Domain/dtos';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(AddressRepository)
    private addressRepository: AddressRepository,
    @InjectRepository(ContactRepository)
    private contactRepository: ContactRepository,
    private httpJsonService: HttpService,
  ) {}

  async getUsers(): Promise<AxiosResponse<Array<JsonplaceholderDto>>> {
    return (await this.httpJsonService.get('/users').toPromise()).data;
  }

  async createUser(
    createUser: Array<JsonplaceholderDto>,
  ): Promise<Array<User>> {
    const listUsers: Array<UserDto> = createUser
      .filter((user) => user.address.suite.toLowerCase().includes('suite'))
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((user) => ({
        name: user.name,
        username: user.username,
        address: user.address,
        contact: {
          email: user.email,
          phone: user.phone,
          website: user.website,
          company: user.company,
        },
      }));

    const users: Array<User> = [];

    for (const user of listUsers) {
      const address = await this.createAddress(user.address);
      const contact = await this.createContact(user.contact);
      const newUser = await this.userRepository.createUser(
        user,
        address,
        contact,
      );

      users.push(newUser);
    }

    return users;
  }

  async createAddress(createAddress: AddressDto): Promise<Address> {
    return await this.addressRepository.createAddress(createAddress);
  }

  async createContact(createContact: ContactDto): Promise<Contact> {
    return await this.contactRepository.createContact(createContact);
  }
}
