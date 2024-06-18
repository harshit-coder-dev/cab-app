import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AcceptDeclineDto } from 'src/dtos/accept-decline.dto';
import { CabDriver } from 'src/entity/cabDriver.entity';
import { CabRequest } from 'src/entity/cabRequest.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DriverService {
  // constructor(
  //     @InjectRepository(CabDriver)
  //     private driverRepository: Repository<CabDriver>,
  //     @InjectRepository(CabRequest)
  //     private requestRepository: Repository<CabRequest>,
  //     private readonly customerStatusGateway: CustomerStatusGateway,
  //   ) {}
  //   async acceptDeclineRequest(acceptDeclineDto: AcceptDeclineDto) {
  //     const request = await this.requestRepository.findOne(acceptDeclineDto.requestId);
  //     request.status = acceptDeclineDto.status;
  //     await this.requestRepository.save(request);
  //     this.customerStatusGateway.notifyCustomer(request.customer.id, request.status);
  //     return request;
  //   }
}
