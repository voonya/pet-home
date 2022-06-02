import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'auth/auth.service';
import { LoginDto, RefreshTokenDto } from 'auth/dto';
import { BaseUserDto } from 'common/models/users/dto';
import { Cookies } from 'common/decorators/cookies.decorator';
import { Response } from 'express';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  async login(@Body() userCredentials: LoginDto, @Res() res: Response) {
    const tokens = await this.authService.login(
      userCredentials.email,
      userCredentials.password,
    );
    return this.setRefreshCookieAndAccessToken(
      res,
      tokens.accessToken,
      tokens.refreshToken,
    );
  }

  @HttpCode(200)
  @Post('registration')
  registration(@Body() user: BaseUserDto) {
    return this.authService.registration(user);
  }

  @HttpCode(200)
  @Post('refresh')
  async refresh(
    @Cookies() refreshTokenDto: RefreshTokenDto,
    @Res() res: Response,
  ) {
    if (!refreshTokenDto.refreshToken) {
      throw new BadRequestException('Refresh token must be provided!');
    }
    const tokens = await this.authService.refresh(refreshTokenDto.refreshToken);
    return this.setRefreshCookieAndAccessToken(
      res,
      tokens.accessToken,
      tokens.refreshToken,
    );
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req, @Res() res) {
    const userId = req.user._id.toString();
    await this.authService.logout(userId);
    res.clearCookie('refreshToken');
    res.send({
      message: 'Success!',
    });
    return res;
  }

  setRefreshCookieAndAccessToken(
    res: Response,
    accessToken: string,
    refreshToken: string,
  ) {
    res.cookie('refreshToken', refreshToken, {
      expires: new Date(
        new Date().getTime() +
          Number(process.env.TIME_LIVE_JWT_COOKIE_HOURS) * 60 * 60 * 1000,
      ),
      sameSite: 'strict',
      httpOnly: true,
    });
    res.send({ accessToken });
    return res;
  }
}
