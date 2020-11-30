import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CompanyDto } from 'Domain/dtos/jsonplaceholder.dto';

export class ContactDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  @ApiProperty({
    type: String,
    example: 'any_email',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @ApiProperty({
    type: String,
    example: 'any_phone',
  })
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @ApiProperty({
    type: String,
    example: 'any_website',
  })
  website: string;

  @IsNotEmpty()
  @ValidateNested()
  @ApiProperty()
  company: CompanyDto;
}
