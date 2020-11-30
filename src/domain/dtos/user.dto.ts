import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { AddressDto, ContactDto } from 'Domain/dtos';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @ApiProperty({
    type: String,
    example: 'any_name',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  @ApiProperty({
    type: String,
    example: 'any_username',
  })
  username: string;

  @IsNotEmpty()
  @ValidateNested()
  @ApiProperty()
  address: AddressDto;

  @IsNotEmpty()
  @ValidateNested()
  @ApiProperty()
  contact: ContactDto;
}
