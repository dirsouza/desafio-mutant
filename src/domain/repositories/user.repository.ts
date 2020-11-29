import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { UserDto } from 'Domain/dtos';
import { User } from 'Domain/entities';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(userDto: UserDto): Promise<User> {
    try {
      const user = this.create(userDto);

      return await this.save(user);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
