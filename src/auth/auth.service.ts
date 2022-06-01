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
    // add guard that user is in DB and user is OK
    const user: UserDto = await this.userService.getByEmail(email);
    console.log(user);
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

  refresh(refreshToken: string) {
    console.log(refreshToken);
    return 'ok';
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
