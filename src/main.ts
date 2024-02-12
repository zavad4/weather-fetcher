import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import assureEnvFulfilled from './utils/assureEnvFulfilled';

async function bootstrap() {
  assureEnvFulfilled();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap().catch((err) => console.log(err));
