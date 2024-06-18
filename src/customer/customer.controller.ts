import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RequestCabDto } from 'src/dtos/request-cab.dto';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('request-cab')
  @UsePipes(new ValidationPipe({ transform: true }))
  async requestCab(@Body() requestCabDto: RequestCabDto) {
    return this.customerService.requestCab(requestCabDto);
  }
}
