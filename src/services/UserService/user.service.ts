// import { User } from "./models/contracts/User";
// import { UserWithHashedPassword } from "./models/contracts/UserWithHashedPassword";
import { Inject, Injectable } from "@nestjs/common";
// import { USER_REPOSITORY } from "./ioc/ioc.id";
// import { UserRepository } from "./DAL/UserRepository";
// import { UserForCreation } from "./models/contracts/UserForCreation";
// import * as uuidv4 from "uuid/v4";
import { UserRepository } from "./repository/user.repository";
import { IUserWithHashedPassword } from "src/models/user.model";
import { IUser } from "./user.interfaces";
// import { UserOptionsForSearching } from "./models/contracts/UserOptionsForSearching";
// import { UserFilterForSearching } from "./models/contracts/UserFilterForSearching";
// import { UserForUpdating } from "./models/contracts/UserForUpdating";
// import { UserSimple } from "./models/contracts/UserSimple";
@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository) private userRepository: UserRepository
  ) { }
  public async getUserById(userId: string): Promise<IUser> {
    return this.userRepository.getUserById(userId);
  }

  public async getUserWithHashedPasswordByEmail(email: string): Promise<IUserWithHashedPassword> {
    return this.userRepository.getUserWithHashedPasswordByEmail(email);
  }
}

