import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { UserDto } from 'Domain/dtos';
import { Address, Contact, User } from 'Domain/entities';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(
    userDto: UserDto,
    address: Address,
    contact: Contact,
  ): Promise<User> {
    try {
      const user = await this.findOne({ username: userDto.username });

      if (user) {
        return user;
      }

      const newUser = this.create({
        ...userDto,
        address,
        contact,
      });

      return await this.save(newUser);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
