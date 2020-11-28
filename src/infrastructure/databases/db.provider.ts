import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  charset: dbConfig.charset,
  synchronize: dbConfig.synchronize,
  logging: dbConfig.logging,
  logger: dbConfig.logger,
  entities: [__dirname + '/../../domain/entities/*.entity.{js,ts}'],
};
