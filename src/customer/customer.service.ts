import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverGateway } from 'src/driver/driver.gateway';
import { RequestCabDto } from 'src/dtos/request-cab.dto';
import { CabRequest } from 'src/entity/cabRequest.entity';
import { Customer } from 'src/entity/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>,
    @InjectRepository(Customer)
    private cabRequestRepo: Repository<CabRequest>,
    private readonly driverRequestGateway: DriverGateway,
  ) {}

  async requestCab(requestCabDto: RequestCabDto) {
    // Save request to database
    const request = this.cabRequestRepo.create(requestCabDto);
    await this.cabRequestRepo.save(request);

    // Emit request to drivers
    // ...

    return request;
  }

  private emitRequestToDrivers(request: any) {
    const drivers = []; // Logic to get nearest drivers
    drivers.forEach((driver) => {
      this.driverRequestGateway.notifyDriver(driver.id, request);
    });
  }
}
