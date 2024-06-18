import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/entity/customer.entity';
import { CabRequest } from 'src/entity/cabRequest.entity';
import { DriverGateway } from 'src/driver/driver.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, CabRequest])],
  providers: [CustomerService, DriverGateway],
  controllers: [CustomerController],
})
export class CustomerModule {}
