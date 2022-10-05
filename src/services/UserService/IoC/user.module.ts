import { Module } from '@nestjs/common';
import { UserService } from '../user.service';
import { UserRepository } from '../repository/user.repository';

@Module({
  imports: [],
  exports: [UserService],
  providers: [UserRepository, UserService],
})
export class UserModule {}
