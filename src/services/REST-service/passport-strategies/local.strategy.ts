import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthenticationService } from "src/services/AuthenticationService/authentication.service";
import { UserService } from "src/services/UserService/user.service";
import { IUser } from "src/services/UserService/user.interfaces";
import { IUserWithHashedPassword } from "src/models/user.model";
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AuthenticationService) private readonly authenticationService: AuthenticationService,
    @Inject(UserService) private readonly userService: UserService,
  ) {
    super({
      usernameField: "email",
      passReqToCallback: false
    });
  }
  public async validate(email: string, password: string, done: Function): Promise<IUser> {
    const userWithHashedPassword: IUserWithHashedPassword =
      await this.userService.getUserWithHashedPasswordByEmail(email);
    if (!userWithHashedPassword) {
      return done(new UnauthorizedException({ message: "No user with such email" }));
    }
    if (!userWithHashedPassword.hashedPassword) {
      return done(new UnauthorizedException({ message: "Password for your account is not set" }));
    }
    if (await this.authenticationService.comparePasswordToHash(password, userWithHashedPassword.hashedPassword)) {
      delete userWithHashedPassword.hashedPassword;

      return done(null, userWithHashedPassword);
    }

    return done(new UnauthorizedException({ message: "Wrong password" }));
  }
}