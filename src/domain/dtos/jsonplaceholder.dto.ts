import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { AddressDto } from 'Domain/dtos';

export class CompanyDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'any_name',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'any_catchPhrase',
  })
  catchPhrase: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'any_bs',
  })
  bs: string;
}

export class JsonplaceholderDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 1,
  })
  id: number;

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
  address: AddressDto;

  @IsNotEmpty()
  @ValidateNested()
  @ApiProperty()
  company: CompanyDto;
}
