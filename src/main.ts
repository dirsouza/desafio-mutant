import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { AppModule } from 'Infrastructure/modules';
import {
  apiServer,
  apiConfig,
  swaggerServer,
  swaggerConfig,
} from 'Infrastructure/servers';
import { winstonConfig } from 'Infrastructure/loggers';

async function bootstrap() {
  const winston = WinstonModule.createLogger(winstonConfig);

  const app = await NestFactory.create(AppModule, {
    logger: winston,
  });

  apiServer(app);
  swaggerServer(app);

  const { host, port, prefix: apiPrefix } = apiConfig;
  const { prefix: swaggerPrefix } = swaggerConfig;

  await app.listen(port);
  winston.log(
    `Appliation listening on: http://${host}:${port}/${apiPrefix}`,
    'API',
  );
  winston.log(
    `Appliation listening on: http://${host}:${port}/${swaggerPrefix}`,
    'SWAGGER',
  );
}
bootstrap();
