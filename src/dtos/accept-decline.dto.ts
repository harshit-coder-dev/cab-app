import {IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class AcceptDeclineDto {
  @IsNotEmpty()
  @IsNumber()
  requestId: number;

  @IsNotEmpty()
  @IsNumber()
  driverId: number;

  @IsNotEmpty()
  @IsString()
  status: string;
}


export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;
}


export class CreateDriverDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;
}

export class CreateCabRequestDto {
  @IsNotEmpty()
  @IsNumber()
  customerId: number;

  @IsNotEmpty()
  @IsNumber()
  pickupLatitude: number;

  @IsNotEmpty()
  @IsNumber()
  pickupLongitude: number;

  @IsNotEmpty()
  @IsNumber()
  dropoffLatitude: number;

  @IsNotEmpty()
  @IsNumber()
  dropoffLongitude: number;
}