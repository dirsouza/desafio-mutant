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
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  username: string;

  @IsNotEmpty()
  @ValidateNested()
  address: AddressDto;

  @IsNotEmpty()
  @ValidateNested()
  contact: ContactDto;
}
