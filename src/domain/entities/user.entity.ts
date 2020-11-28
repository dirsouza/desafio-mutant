import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address, Contact } from 'Domain/entities';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    length: 100,
  })
  name: string;

  @Column('varchar', {
    length: 40,
    unique: true,
  })
  username: string;

  @OneToOne(() => Address, (address) => address.user)
  @JoinColumn({
    name: 'address_id',
    referencedColumnName: 'id',
  })
  address: Address;

  @OneToOne(() => Contact, (contact) => contact.user)
  @JoinColumn({
    name: 'contact_id',
    referencedColumnName: 'id',
  })
  contact: Contact;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt: Date;
}
