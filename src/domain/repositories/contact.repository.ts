import { EntityRepository, Repository } from 'typeorm';
import { Contact } from 'Domain/entities';

@EntityRepository(Contact)
export class ContactRepository extends Repository<Contact> {}
