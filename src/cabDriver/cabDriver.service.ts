import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerStatusGateway } from 'src/customer/customer-status.gateway';
import {
  AcceptDeclineDto,
  CreateCabRequestDto,
  CreateDriverDto,
} from 'src/dtos/accept-decline.dto';
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
    private readonly customerStatusGateway: CustomerStatusGateway,
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
        throw new HttpException(
          'Unauthorized access to request',
          HttpStatus.UNAUTHORIZED,
        );
      }

      if (status === 'accept') {
        cabRequest.status = 'accepted';
      } else if (status === 'decline') {
        cabRequest.status = 'declined';

        await this.passRequestToNextNearestDriver(cabRequest);
      }

      this.customerStatusGateway.notifyCustomer(
        cabRequest.id,
        cabRequest.status,
      );

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
    const nearbyDrivers = await this.cabRequestRepo
      .createQueryBuilder('request')
      .leftJoinAndSelect('request.cabDriver', 'driver')
      .where('request.id != :requestId', { requestId: cabRequest.id })
      .andWhere(
        'ST_Distance_Sphere(point(driver.latitude, driver.longitude), point(:pickupLatitude, :pickupLongitude)) <= :radius',
        {
          pickupLatitude: cabRequest.pickupLatitude,
          pickupLongitude: cabRequest.pickupLongitude,
          radius: 15000,
        },
      )
      .orderBy(
        'ST_Distance_Sphere(point(driver.latitude, driver.longitude), point(:pickupLatitude, :pickupLongitude))',
        'ASC',
      )
      .getOne();

    console.log(nearbyDrivers);

    return nearbyDrivers?.cabDriver;
  }

  private getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Radius of the Earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }

  private deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  async findDriversWithinRadius(lat: number, lon: number, radius: number) {
    const allDrivers = await this.driverRepo.find();
    const nearbyDrivers = allDrivers.filter((driver) => {
      const distance = this.getDistance(
        lat,
        lon,
        driver.latitude,
        driver.longitude,
      );
      return distance <= radius;
    });

    // Sort drivers by distance
    return nearbyDrivers.sort((a, b) => {
      const distanceA = this.getDistance(lat, lon, a.latitude, a.longitude);
      const distanceB = this.getDistance(lat, lon, b.latitude, b.longitude);
      return distanceA - distanceB;
    });
  }
}
