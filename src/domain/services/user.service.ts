import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address, Contact, User } from 'Domain/entities';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import {
  AddressRepository,
  ContactRepository,
  UserRepository,
} from 'Domain/repositories';
import { AddressDto, ContactDto, UserDto } from 'Domain/dtos';

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

  getUsers(): Observable<AxiosResponse<UserDto[]>> {
    return this.httpJsonService.get('/users');
  }

  async createUser(createUser: UserDto): Promise<User> {
    const address = await this.createAddress(createUser.address);
    const contact = await this.createContact(createUser.contact);

    return await this.userRepository.createUser(createUser, address, contact);
  }

  async createAddress(createAddress: AddressDto): Promise<Address> {
    return await this.addressRepository.createAddress(createAddress);
  }

  async createContact(createContact: ContactDto): Promise<Contact> {
    return await this.contactRepository.createContact(createContact);
  }
}
