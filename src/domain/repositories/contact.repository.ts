import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Contact } from 'Domain/entities';
import { ContactDto } from 'Domain/dtos';

@EntityRepository(Contact)
export class ContactRepository extends Repository<Contact> {
  async createContact(contactDto: ContactDto): Promise<Contact> {
    try {
      const contact = await this.findOne({ email: contactDto.email });

      if (contact) {
        return contact;
      }

      const newContact = this.create(contactDto);

      return await this.save(newContact);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
