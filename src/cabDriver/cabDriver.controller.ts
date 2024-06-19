import { Body, Controller, HttpException, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { DriverService } from './cabDriver.service';
import { AcceptDeclineDto, CreateDriverDto } from 'src/dtos/accept-decline.dto';

@Controller('driver')
export class DriverController {

    constructor(private readonly driverService: DriverService) {}

    @Post('add')
    async addDriver(@Body() createDriverDto: CreateDriverDto) {
      try {
        const newDriver = await this.driverService.addDriver(createDriverDto);
        return { success: true, data: newDriver };
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @Post('accept-decline')
    async acceptDeclineRequest(@Body() acceptDeclineDto: AcceptDeclineDto) {
      try {
        const updatedRequest = await this.driverService.acceptDeclineRequest(acceptDeclineDto);
        return { success: true, data: updatedRequest };
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
}
