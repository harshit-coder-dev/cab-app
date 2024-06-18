import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
