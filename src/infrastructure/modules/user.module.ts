import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address, Contact, User } from 'Domain/entities';
import {
  AddressRepository,
  ContactRepository,
  UserRepository,
} from 'Domain/repositories';
import { HttpJsonplaceholderService, UserService } from 'Domain/services';
import { UserController } from 'App/v1/controllers';

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
    HttpModule.registerAsync({
      useClass: HttpJsonplaceholderService,
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
