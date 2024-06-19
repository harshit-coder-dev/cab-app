import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RequestCabDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  pickupLatitude: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  pickupLongitude: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  dropoffLatitude: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  dropoffLongitude: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  status: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  customerId: number;

  @IsNumber()
  @ApiProperty()
  driverId?: number;
}
