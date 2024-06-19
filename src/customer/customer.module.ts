import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/entity/customer.entity';
import { CabRequest } from 'src/entity/cabRequest.entity';
import { CabDriver } from 'src/entity/cabDriver.entity';
import { CustomerStatusGateway } from './customer-status.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, CabRequest,CabDriver])],
  providers: [CustomerService, CustomerStatusGateway],
  controllers: [CustomerController],
})
export class CustomerModule {}
