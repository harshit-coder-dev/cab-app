import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class AcceptDeclineDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  requestId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  driverId: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  status: string;
}

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  phone: string;
}

export class CreateDriverDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  latitude: number;

  @ApiProperty()
  longitude: number;
}

export class CreateCabRequestDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  customerId: number;

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
}
