import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseUserDto, UserDto } from 'common/models/users/dto';
import { UsersService } from 'common/models/users/users.service';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'auth/services/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private tokenService: TokenService,
  ) {}

  async login(email: string, password: string) {
    const user: UserDto = await this.userService.getByEmail(email);
    const isPasswordCorrect = await this.checkPasswords(
      password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new BadRequestException('Incorrect password!');
    }
    const tokens = this.generateTokens(user);
    await this.tokenService.saveToken(tokens.refreshToken, user._id);
    return tokens;
  }

  async registration(user: BaseUserDto) {
    return this.userService.create(user);
  }

  async refresh(refreshToken: string) {
    const userData = this.tokenService.verifyRefreshToken(refreshToken);
    const refreshTokenInDb = await this.tokenService.getTokenById(
      userData?._id,
    );
    if (
      !userData ||
      !refreshTokenInDb ||
      refreshToken !== refreshTokenInDb.token
    ) {
      throw new BadRequestException('Refresh token is invalid!');
    }
    const user = await this.userService.getById(userData._id);
    const tokens = this.generateTokens(user);
    await this.tokenService.saveToken(tokens.refreshToken, user._id);
    return tokens;
  }

  async logout(userId: string) {
    const logoutRes = await this.tokenService.removeToken(userId);
    if (!logoutRes) {
      throw new BadRequestException('You are already logouted!');
    }
  }

  checkPasswords(givenPassword, databasePassword) {
    return bcrypt.compare(givenPassword, databasePassword);
  }

  generateTokens(payload: UserDto) {
    const accessToken = this.tokenService.generateAccessToken({ payload });
    const refreshToken = this.tokenService.generateRefreshToken({ payload });

    return {
      accessToken,
      refreshToken,
    };
  }
}
