import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CabRequest } from './cabRequest.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @OneToMany(() => CabRequest, (request) => request.customer)
  cabRequests: CabRequest[];
}
