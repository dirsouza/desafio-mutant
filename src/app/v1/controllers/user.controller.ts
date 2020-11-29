import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { UserService } from 'Domain/services';
import { User } from 'Domain/entities';
import { UserDto } from 'Domain/dtos';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findUsers(): Promise<AxiosResponse<Array<UserDto>>> {
    return this.userService.getUsers();
  }

  @Post()
  create(
    @Body(ValidationPipe) createUserDto: Array<UserDto>,
  ): Promise<Array<User>> {
    return this.userService.createUser(createUserDto);
  }
}
