import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { DriverModule } from './cabDriver/cabDriver.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestStatusGateway } from './request-status/request-status.gateway';
import { DriverGateway } from './driver/driver.gateway';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'cab_app',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CustomerModule,
    DriverModule,
  ],
  controllers: [AppController],
  providers: [AppService, RequestStatusGateway, DriverGateway],
})
export class AppModule {}
