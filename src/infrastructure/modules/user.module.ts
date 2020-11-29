import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address, Contact, User } from 'Domain/entities';
import {
  AddressRepository,
  ContactRepository,
  UserRepository,
} from 'Domain/repositories';
import { UserService } from 'Domain/services/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserRepository,
      Address,
      AddressRepository,
      Contact,
      ContactRepository,
    ]),
  ],
  providers: [UserService],
})
export class UserModule {}
