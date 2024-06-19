import { Body, Controller, Post } from '@nestjs/common';
import { RequestCabDto } from 'src/dtos/request-cab.dto';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from 'src/dtos/accept-decline.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('customer')
@ApiTags('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('request-cab')
  async requestCab(@Body() requestCabDto: RequestCabDto) {
    return this.customerService.requestCab(requestCabDto);
  }

  @Post('add')
  async addCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.addCustomer(createCustomerDto);
  }
}
