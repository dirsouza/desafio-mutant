import { AddressDto } from 'Domain/dtos';
import { ICompany } from 'Domain/interfaces';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class JsonplaceholderDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  website: string;

  @IsNotEmpty()
  @ValidateNested()
  address: AddressDto;

  @IsNotEmpty()
  @ValidateNested()
  company: ICompany;
}
