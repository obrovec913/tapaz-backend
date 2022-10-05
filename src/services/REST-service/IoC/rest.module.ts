import { Module } from '@nestjs/common';
import { ArticleController } from '../controllers/article-controller/article.controller';
import { ArticleModule } from 'src/services/ArticleService/IoC/article.module';
import { AuthenticationModule } from 'src/services/AuthenticationService/IoC/authentication.module';
import { UserModule } from 'src/services/UserService/IoC/user.module';
import { LocalStrategy } from '../passport-strategies/local.strategy';
import { JWTStrategy } from '../passport-strategies/JWT.strategy';
import { AuthenticationController } from '../controllers/authentication-controller/authentication.controller';
import { EmailModule } from '../../EmailService/IoC/email.module';
import { EmailController } from '../controllers/email-controller/email.controller';

@Module({
  imports: [ArticleModule, AuthenticationModule, UserModule, EmailModule],
  exports: [],
  providers: [LocalStrategy, JWTStrategy],
  controllers: [ArticleController, AuthenticationController, EmailController],
})
export class RestModule {}
