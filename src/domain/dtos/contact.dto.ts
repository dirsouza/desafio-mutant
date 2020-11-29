import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { ICompany } from 'Domain/interfaces';

export class ContactDto {
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
  companiy: ICompany;
}
