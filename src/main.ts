import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { RestModule } from './services/REST-service/IoC/rest.module';
import * as dotenv from 'dotenv';
import { json } from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { UserModel, IUserWithHashedPassword } from './models/user.model';
import { AuthenticationService } from './services/AuthenticationService/authentication.service';
dotenv.config();

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(RestModule);
  app.setGlobalPrefix('api');
  const options: CorsOptions = {
    origin: [process.env.FRONT_URL],
    credentials: true,
    exposedHeaders: ['jwt_token'],
  };
  app.enableCors(options);
  app.use(json({ limit: '100mb' }));
  app.use(cookieParser());
  await connectToDb();
  await addUser(app);
  await app.listen(process.env.PORT || 3000);
}

async function connectToDb() {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/tapaz_db', { useNewUrlParser: true });
  const db: Connection = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('mongodb is connected');
  });
}

async function addUser(app: INestApplication): Promise<void> {
  const authenticationService: AuthenticationService = app.get(
    AuthenticationService,
  );
  const user: IUserWithHashedPassword = await UserModel.findOne();
  if (!user) {
    const hashedPassword: string = await authenticationService.createHashedPassword('g2Z;6.+]Xzmb~g`%$LdfX/WJ#rWC8m?:QndA]{');

    await UserModel.create({
      email: 'admin@admin.com',
      hashedPassword: hashedPassword,
    });
  }
}

bootstrap();
