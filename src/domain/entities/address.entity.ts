import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

type TGeo = {
  lat: string;
  lng: string;
};

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
  geo: TGeo;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt: Date;
}
