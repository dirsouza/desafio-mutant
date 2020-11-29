import {
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { IsUserAlreadyExist } from 'Infrastructure/validators';
import { Address, Contact } from 'Domain/entities';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  @IsUserAlreadyExist()
  username: string;

  @IsNotEmpty()
  @ValidateNested()
  address: Address;

  @IsNotEmpty()
  @ValidateNested()
  contact: Contact;
}
