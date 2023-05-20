import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Feed } from "./entity/Feed"
// import { InjectRepository } from '@nestjs/typeorm';
import { createConnection } from 'typeorm';
// import { seeder } from './feed/seeders/feed.seeder'



// async function runSeeders() {
//   const connection = await createConnection({
//     type: 'sqlite',
//     database: ':memory:',
//     entities: [Feed],
//     synchronize: true,
//     logging: false,
//   });
//   const feedRepository = connection.getRepository(Feed);
//   await seeder(feedRepository)
// }

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);

}
bootstrap();

