import { Module } from '@nestjs/common';
import { AuthenticationService } from '../authentication.service';

@Module({
  imports: [],
  exports: [AuthenticationService],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
