import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'Domain/entities';

type TCompany = {
  name: string;
  catchPhrase: string;
  bs: string;
};

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
  company: TCompany;

  @OneToOne(() => User, (user) => user.contact)
  user: User;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt: Date;
}
