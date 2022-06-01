import { Body, Controller, Post, Response } from '@nestjs/common';
import { AuthService } from 'auth/auth.service';
import { LoginDto, ResfreshTokenDto } from 'auth/dto';
import { BaseUserDto } from 'common/models/users/dto';
import { Cookies } from 'common/decorators/cookies.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() userCredentials: LoginDto, @Response() res) {
    const tokens = await this.authService.login(
      userCredentials.email,
      userCredentials.password,
    );
    res.cookie('refreshToken', tokens.refreshToken, {
      expires: new Date(new Date().getTime() + 30 * 1000),
      sameSite: 'strict',
      httpOnly: true,
    });
    res.send({ accessToken: tokens.accessToken });
    return res;
  }

  @Post('registration')
  registration(@Body() user: BaseUserDto) {
    return this.authService.registration(user);
  }

  @Post('refresh')
  refresh(@Cookies('refreshToken') refreshTokenDto: ResfreshTokenDto) {
    this.authService.refresh(refreshTokenDto.refreshToken);
    return {
      message: 'OK Refresh',
    };
  }
}
