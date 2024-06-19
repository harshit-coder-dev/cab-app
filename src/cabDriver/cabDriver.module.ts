import { Module } from '@nestjs/common';
import { DriverController } from './cabDriver.controller';
import { DriverService } from './cabDriver.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CabDriver } from 'src/entity/cabDriver.entity';
import { CabRequest } from 'src/entity/cabRequest.entity';
import { CustomerStatusGateway } from 'src/customer/customer-status.gateway';
import { Customer } from 'src/entity/customer.entity';
import { CabRequestGateway } from './cab-request.gateway';
import { CustomerService } from 'src/customer/customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([CabDriver, CabRequest, Customer])],
  controllers: [DriverController],
  providers: [
    DriverService,
    CustomerStatusGateway,
    CabRequestGateway,
    CustomerService,
  ],
})
export class DriverModule {}
