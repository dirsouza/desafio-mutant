import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AxiosResponse } from 'axios';
import { UserService } from 'Domain/services';
import { User } from 'Domain/entities';
import { ExceptionDto, JsonplaceholderDto, UserDto } from 'Domain/dtos';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Download Data' })
  @ApiOkResponse({ description: 'Success', type: [JsonplaceholderDto] })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: ExceptionDto,
  })
  findUsers(): Promise<AxiosResponse<Array<JsonplaceholderDto>>> {
    return this.userService.getUsers();
  }

  @Post()
  @ApiOperation({ summary: 'Save Data' })
  @ApiBody({ type: JsonplaceholderDto, isArray: true })
  @ApiCreatedResponse({ description: 'Create', type: [UserDto] })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: ExceptionDto,
  })
  create(
    @Body(ValidationPipe) createUserDto: Array<JsonplaceholderDto>,
  ): Promise<Array<User>> {
    return this.userService.createUser(createUserDto);
  }
}
