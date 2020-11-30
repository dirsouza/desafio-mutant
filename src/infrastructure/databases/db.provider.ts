import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import * as config from 'config';

export const dbConfig: MysqlConnectionOptions = config.get('db');

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
  entities: [__dirname + '/../../domain/entities/*.entity.{js,ts}'],
};
