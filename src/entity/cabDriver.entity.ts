import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CabRequest } from './cabRequest.entity';

@Entity()
export class CabDriver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column('decimal', { precision: 10, scale: 6 ,nullable: true})
  latitude: number;

  @Column('decimal', { precision: 10, scale: 6 ,nullable: true})
  longitude: number;

  @OneToMany(() => CabRequest, (request) => request.cabDriver)
  cabRequests: CabRequest[];
}
