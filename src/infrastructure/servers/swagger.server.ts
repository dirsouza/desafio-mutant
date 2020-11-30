import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as config from 'config';

export interface ISwaggerConfig {
  title: string;
  description: string;
  version: string;
  prefix: string;
}

export const swaggerConfig: ISwaggerConfig = config.get('swagger');

export const swaggerServer = (app: INestApplication) => {
  const { title, description, version, prefix } = swaggerConfig;

  const swgOptions = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .build();

  const swgDocument = SwaggerModule.createDocument(app, swgOptions);

  SwaggerModule.setup(prefix, app, swgDocument);
};
