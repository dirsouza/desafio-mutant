import {
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { IGeo } from 'Domain/intefaces';

export class AddressDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  suite: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  street: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  city: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  zipcode: string;

  @IsNotEmpty()
  @ValidateNested()
  geo: IGeo;
}
