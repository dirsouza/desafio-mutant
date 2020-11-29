import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Address } from 'Domain/entities';
import { AddressDto } from 'Domain/dtos';

@EntityRepository(Address)
export class AddressRepository extends Repository<Address> {
  async createAddress(addressDto: AddressDto): Promise<Address> {
    try {
      const address = await this.findOne({ suite: addressDto.suite });

      if (address) {
        return address;
      }

      const newAddress = this.create(addressDto);

      return await this.save(newAddress);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
