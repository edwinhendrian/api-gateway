import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './response/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ResponseInterceptor()); // response handler interceptor

  const config = new DocumentBuilder()
    .setTitle('ECommerce NestJS API Gateway')
    .setDescription('The ECommerce NestJS description')
    .setVersion('1.0')
    .setBasePath('api')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, document);

  app.listen(process.env.PORT).then(() => {
    console.log('API Gateway is running..');
  });
}
bootstrap();
