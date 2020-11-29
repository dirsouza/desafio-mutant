import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Contact } from 'Domain/entities';
import { ContactDto } from 'Domain/dtos';

@EntityRepository(Contact)
export class ContactRepository extends Repository<Contact> {
  async createContact(contactDto: ContactDto): Promise<Contact> {
    try {
      const contact = this.create(contactDto);

      return await this.save(contact);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
