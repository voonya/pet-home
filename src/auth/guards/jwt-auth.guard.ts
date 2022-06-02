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
import { Reflector } from '@nestjs/core';
import { RoleEnum } from 'common/models/users/role.enum';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private userService: UsersService,
    private reflector: Reflector,
  ) {}

  private matchRoles(
    userRoles: RoleEnum[],
    requiredRoles: RoleEnum[],
  ): boolean {
    return userRoles.some((role) => requiredRoles.includes(role));
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authorization = req?.headers?.authorization?.split(' ');
    console.log(authorization);
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
    console.log(user);
    const userInDb = await this.userService.getById(user._id);
    if (!userInDb) {
      throw new BadRequestException('User does not exist!');
    }

    if (userInDb?.banned) {
      throw new ForbiddenException('User is banned!');
    }
    req.user = userInDb;

    const roles = this.reflector.get<RoleEnum[]>(
      'roles',
      context.getHandler(),
    ) ?? [RoleEnum.User];
    return this.matchRoles(userInDb.roles, roles);
  }
}
