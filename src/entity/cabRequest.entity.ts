import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Customer } from './customer.entity';
import { CabDriver } from './cabDriver.entity';
@Entity()
export class CabRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string; // e.g., 'pending', 'accepted', 'declined'

  @Column('decimal', { precision: 10, scale: 6 })
  pickupLatitude: number;

  @Column('decimal', { precision: 10, scale: 6 })
  pickupLongitude: number;

  @Column('decimal', { precision: 10, scale: 6 })
  dropoffLatitude: number;

  @Column('decimal', { precision: 10, scale: 6 })
  dropoffLongitude: number;

  @ManyToOne(() => Customer, (customer) => customer.cabRequests)
  customer: Customer;

  @ManyToOne(() => CabDriver, (driver) => driver.cabRequests)
  cabDriver: CabDriver;
}
