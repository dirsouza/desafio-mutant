import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'Infrastructure/databases';
import { UserModule } from 'Infrastructure/modules';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule],
})
export class AppModule {}
