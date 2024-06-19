import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto } from 'src/dtos/accept-decline.dto';
import { RequestCabDto } from 'src/dtos/request-cab.dto';
import { CabDriver } from 'src/entity/cabDriver.entity';
import { CabRequest } from 'src/entity/cabRequest.entity';
import { Customer } from 'src/entity/customer.entity';
import { Repository } from 'typeorm';
import { CustomerStatusGateway } from './customer-status.gateway';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>,
    @InjectRepository(CabRequest)
    private cabRequestRepo: Repository<CabRequest>,
    @InjectRepository(CabDriver)
    private cabDriver: Repository<CabDriver>,
    private readonly customerStatusGateway: CustomerStatusGateway
  ) {}

  async addCustomer(request:CreateCustomerDto){
    const customer = this.customerRepo.create(request);
    return this.customerRepo.save(customer);
  }

  async requestCab(requestCabDto: RequestCabDto) {
    const customer = await this.customerRepo.findOne({
      where: {
        id: requestCabDto.customerId
      },
    });
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const driver = requestCabDto.driverId ? await this.cabDriver.findOne({
      where: {
        id: requestCabDto.driverId
      },
    }) : null;

    if (requestCabDto.driverId && !driver) {
      throw new NotFoundException('Driver not found');
    }

    const request = this.cabRequestRepo.create({
      ...requestCabDto,
      customer: customer,
      cabDriver:driver
    });

    const savedRequest =await this.cabRequestRepo.save(request);

    this.customerStatusGateway.server.emit('newCabRequest', savedRequest);

    return savedRequest;
  }

}
