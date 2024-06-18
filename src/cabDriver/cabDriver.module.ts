import { Module } from '@nestjs/common';
import { DriverController } from './cabDriver.controller';
import { DriverService } from './cabDriver.service';

@Module({
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {}
