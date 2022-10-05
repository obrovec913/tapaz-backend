import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthenticationService {
  public createToken(userId: string): string {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_SHORT_TIME });
  }
  public async comparePasswordToHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
  public async createHashedPassword(password: string): Promise<string> {
    const salt: string = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}