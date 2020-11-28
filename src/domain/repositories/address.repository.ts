import { EntityRepository, Repository } from 'typeorm';
import { Address } from 'Domain/entities';

@EntityRepository(Address)
export class AddressRepository extends Repository<Address> {}
