import { ApiProperty } from '@nestjs/swagger';

export class ExceptionDto {
  @ApiProperty()
  statuscode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}
