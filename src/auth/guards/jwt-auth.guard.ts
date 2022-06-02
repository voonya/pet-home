import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from 'auth/services/token/token.service';
import { UsersService } from 'common/models/users/users.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authorization = req?.headers?.authorization?.split(' ');
    if (!authorization) {
      throw new UnauthorizedException('Jwt should be provided!');
    }

    if (authorization[0] !== 'Bearer' || !authorization[1]) {
      throw new UnauthorizedException('Jwt malformed!');
    }
    const user = this.tokenService.verifyAccessToken(authorization[1]);
    if (!user) {
      throw new UnauthorizedException('Invalid jwt!');
    }

    const userInDb = await this.userService.getById(user._id);
    if (!userInDb) {
      throw new BadRequestException('User does not exist!');
    }

    if (userInDb?.banned) {
      throw new ForbiddenException('User is banned!');
    }
    req.user = userInDb;
    return true;
  }
}
