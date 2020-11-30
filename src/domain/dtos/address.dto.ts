import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

class GeoDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'any_lat',
  })
  lat: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'any_lng',
  })
  lng: string;
}

export class AddressDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @ApiProperty({
    type: String,
    example: 'any_suite',
  })
  suite: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @ApiProperty({
    type: String,
    example: 'any_street',
  })
  street: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @ApiProperty({
    type: String,
    example: 'any_city',
  })
  city: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  @ApiProperty({
    type: String,
    example: 'any_zipcode',
  })
  zipcode: string;

  @IsNotEmpty()
  @ValidateNested()
  @ApiProperty()
  geo: GeoDto;
}
