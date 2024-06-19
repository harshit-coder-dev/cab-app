import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerStatusGateway } from 'src/customer/customer-status.gateway';
import { AcceptDeclineDto, CreateCabRequestDto, CreateDriverDto } from 'src/dtos/accept-decline.dto';
import { CabDriver } from 'src/entity/cabDriver.entity';
import { CabRequest } from 'src/entity/cabRequest.entity';
import { Customer } from 'src/entity/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DriverService {
  
  constructor(
    @InjectRepository(CabDriver)
    private driverRepo: Repository<CabDriver>,
    @InjectRepository(CabRequest)
    private cabRequestRepo: Repository<CabRequest>,
    private readonly customerStatusGateway: CustomerStatusGateway
  ) {}

  async addDriver(createDriverDto: CreateDriverDto) {
    const driver = this.driverRepo.create(createDriverDto);
    return this.driverRepo.save(driver);
  }

  async acceptDeclineRequest(acceptDeclineDto: AcceptDeclineDto) {
    const { requestId, driverId, status } = acceptDeclineDto;
  
    try {
      const cabRequest = await this.cabRequestRepo.findOne({
        where: {
          id: requestId,
          status: 'pending',
        },
        relations: ['customer', 'cabDriver'],
      });
  
      if (!cabRequest) {
        throw new NotFoundException('Cab request not found');
      }
      
      if (!cabRequest.cabDriver || cabRequest.cabDriver.id !== driverId) {
        throw new HttpException('Unauthorized access to request', HttpStatus.UNAUTHORIZED);
      }
  
      if (status === 'accept') {
        cabRequest.status = 'accepted';
      } else if (status === 'decline') {
        cabRequest.status = 'declined';
  
        await this.passRequestToNextNearestDriver(cabRequest);
      }
  
      this.customerStatusGateway.notifyCustomer(cabRequest.id, cabRequest.status);

      await this.cabRequestRepo.save(cabRequest);
  
      return cabRequest;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  

  async passRequestToNextNearestDriver(cabRequest: CabRequest) {
    const nearestDriver = await this.findNearestAvailableDriver(cabRequest);

    if (nearestDriver) {
      cabRequest.cabDriver = nearestDriver;
      cabRequest.status = 'pending';
      await this.cabRequestRepo.save(cabRequest);
    }
  }

  async findNearestAvailableDriver(cabRequest: CabRequest) {
    const nearbyDrivers = await this.cabRequestRepo.createQueryBuilder('request')
      .leftJoinAndSelect('request.cabDriver', 'driver')
      .where('request.id != :requestId', { requestId: cabRequest.id })
      .andWhere('ST_Distance_Sphere(point(driver.latitude, driver.longitude), point(:pickupLatitude, :pickupLongitude)) <= :radius', {
        pickupLatitude: cabRequest.pickupLatitude,
        pickupLongitude: cabRequest.pickupLongitude,
        radius: 15000,
      })
      .orderBy('ST_Distance_Sphere(point(driver.latitude, driver.longitude), point(:pickupLatitude, :pickupLongitude))', 'ASC')
      .getOne();

      console.log(nearbyDrivers);
    
    return nearbyDrivers?.cabDriver;
  }
}
