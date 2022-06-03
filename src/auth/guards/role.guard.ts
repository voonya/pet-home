import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from 'common/models/users/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  private matchRoles(
    userRoles: RoleEnum[],
    requiredRoles: RoleEnum[],
  ): boolean {
    return userRoles.some((role) => requiredRoles.includes(role));
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const roles = this.reflector.get<RoleEnum[]>(
      'roles',
      context.getHandler(),
    ) ?? [RoleEnum.User];
    const userRoles = req?.user?.roles ?? [];
    return this.matchRoles(userRoles, roles);
  }
}
