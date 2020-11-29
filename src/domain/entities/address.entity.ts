import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'Domain/entities';
import { IGeo } from 'Domain/intefaces';

@Entity('address')
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    length: 50,
  })
  suite: string;

  @Column('varchar', {
    length: 100,
  })
  street: string;

  @Column('varchar', {
    length: 100,
  })
  city: string;

  @Column('varchar', {
    length: 10,
  })
  zipcode: string;

  @Column('json')
  geo: IGeo;

  @OneToOne(() => User, (user) => user.address)
  user: User;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt: Date;
}
