import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { Parameters } from './helpers/Parameters';
import { AddTracingExceptionFilter } from './module/infrastructure/nestjs/exception-filters';
import { initializeTracing } from './module/infrastructure/nestjs/open-telemetry';

async function bootstrap() {
  initializeTracing();
  const logger = new Logger();
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: { origin: '*' },
  });
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AddTracingExceptionFilter(httpAdapter));

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );

  app.use(compression({ encodings: ['gzip', 'deflate'] }));

  const config = new DocumentBuilder()
    .setTitle('Mantainers Microservice')
    .setDescription('API specification for mantainers. Auna.')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'Access Token',
    );

  if (Parameters.urlServerSwagger) {
    config.addServer(Parameters.urlServerSwagger);
  }

  const documentBuild = config.build();

  const document = SwaggerModule.createDocument(app, documentBuild, {
    operationIdFactory: (controlKey: string, methodKey: string) => methodKey,
  });
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(Parameters.port, '0.0.0.0', () =>
    logger.log(`Server is running on port ${Parameters.port}`, 'Status Server'),
  );
}
bootstrap();
