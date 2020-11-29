import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'Domain/entities';
import { ICompany } from 'Domain/interfaces';

@Entity('contacts')
export class Contact extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    unique: true,
    length: 100,
  })
  email: string;

  @Column('varchar', {
    length: 20,
  })
  phone: string;

  @Column('varchar', {
    length: 100,
  })
  website: string;

  @Column('json')
  company: ICompany;

  @OneToOne(() => User, (user) => user.contact)
  user: User;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt: Date;
}
