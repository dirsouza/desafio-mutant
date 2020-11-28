import { INestApplication } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as config from 'config';

export type TApiConfig = {
  host: string;
  port: number;
  prefix: string;
};

export const apiConfig: TApiConfig = config.get('server');

export const apiServer = (app: INestApplication) => {
  app.setGlobalPrefix(apiConfig.prefix);
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  app.use(compression());
  app.enableCors();
};
