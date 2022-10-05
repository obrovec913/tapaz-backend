import {
  Controller,
  Post,
  HttpCode,
  UseGuards,
  Req,
  Inject,
  Res,
  Get,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticationService } from 'src/services/AuthenticationService/authentication.service';
import { JWT_COOKIE_NAME } from 'src/constants';

@Controller('/auth')
export class AuthenticationController {
  constructor(
    @Inject(AuthenticationService)
    private readonly authenticationService: AuthenticationService,
  ) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  public async login(@Req() req, @Res() res): Promise<void> {
    res.cookie(
      JWT_COOKIE_NAME,
      this.authenticationService.createToken(req.user.id),
      {
        maxAge: parseInt(process.env.JWT_SHORT_TIME),
        httpOnly: true,
      },
    );

    res.send();
  }

  @Get('user')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  public async getIsloggedIn(): Promise<void> {
    return;
  }

  @Delete('logout')
  @HttpCode(200)
  public async logout(@Res() res) {
    res.clearCookie(JWT_COOKIE_NAME, { httpOnly: true });
    
    res.send();
  }
}
