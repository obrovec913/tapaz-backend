import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { IJWTPayload } from "../../AuthenticationService/models/JWTPayload";
import { Request as ExpressRequest } from "express";
import { UserService } from "src/services/UserService/user.service";
import { IUser } from "src/services/UserService/user.interfaces";
@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor (
        @Inject(UserService) private readonly userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors(
                [(request: ExpressRequest) => request.cookies.jwt_token]
            ),
            secretOrKey: process.env.JWT_SECRET
        });
    }
    public async validate (payload: IJWTPayload): Promise<IUser> {
        const user: IUser = await this.userService.getUserById(payload.id);
        if (!user) {
            throw new UnauthorizedException({ message: "Wrong JWT token" });
        }
        return user;
    }
}