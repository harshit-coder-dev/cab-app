import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RequestCabDto {
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

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsNumber()
  customerId: number;

  //   @IsNumber()
  //   driverId?: number;
}
