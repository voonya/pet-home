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
    return this.generateTokens(user);
  }

  async registration(user: BaseUserDto) {
    const hashedPassword = await this.hashPassword(user.password);
    return this.userService.create({ ...user, password: hashedPassword });
  }

  async refresh(refreshToken: string) {
    const userData = this.tokenService.verifyRefreshToken(refreshToken);
    const refreshTokenInDb = await this.tokenService.getTokenById(
      userData?._id,
    );
    if (!userData || !refreshTokenInDb) {
      throw new BadRequestException('Refresh token is invalid!');
    }
    const user = await this.userService.getById(userData._id);
    const tokens = this.generateTokens(user);
    await this.tokenService.saveToken(tokens.refreshToken, user._id);
    return tokens;
  }

  async logout(userId: string) {
    await this.tokenService.removeToken(userId);
  }

  hashPassword(password: string) {
    return bcrypt.hash(password, Number(process.env.PASSWORD_SALT));
  }

  checkPasswords(givenPassword, databasePassword) {
    return bcrypt.compare(givenPassword, databasePassword);
  }

  generateTokens(payload: any) {
    const accessToken = this.tokenService.generateAccessToken(payload._doc);
    const refreshToken = this.tokenService.generateRefreshToken(payload._doc);

    return {
      accessToken,
      refreshToken,
    };
  }
}
