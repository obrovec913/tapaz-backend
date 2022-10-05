import { Injectable } from '@nestjs/common';
import { IUserWithHashedPassword } from 'src/models/user.model';
import { UserModel } from '../../../models/user.model';
import { IUser } from '../user.interfaces';

@Injectable()
export class UserRepository {
  async getUserWithHashedPasswordByEmail(email: string): Promise<IUserWithHashedPassword> {
    return UserModel.findOne({
      email,
    });
  }

  async getUserById(userId: string): Promise<IUser> {
    return UserModel.findById(userId).select(['email']);
  }
}
