import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { AppModule } from 'Infrastructure/modules';
import { apiServer, apiConfig } from 'Infrastructure/servers';
import { winstonConfig } from 'Infrastructure/loggers';

async function bootstrap() {
  const winston = WinstonModule.createLogger(winstonConfig);

  const app = await NestFactory.create(AppModule, {
    logger: winston,
  });

  apiServer(app);

  const { host, port, prefix: apiPrefix } = apiConfig;

  await app.listen(port);
  winston.log(
    `Appliation listening on: http://${host}:${port}/${apiPrefix}`,
    'API',
  );
}
bootstrap();
