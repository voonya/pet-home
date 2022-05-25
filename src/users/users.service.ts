import { Injectable, NotFoundException } from '@nestjs/common';
import { AddRoleDto, BaseUserDto, UserDto, BanUserDto } from '@users/dto';
import { users } from '@users/users';
import { randomUUID } from 'crypto';
import { PaginationDto } from 'pagination/dto/pagination.dto';
import { RoleEnum } from '@users/role.enum';

@Injectable()
export class UsersService {
  getAll(pagination: PaginationDto) {
    return users.slice(pagination.offset, pagination.offset + pagination.limit);
  }

  create(createUserDto: BaseUserDto) {
    const newUser: UserDto = {
      id: randomUUID(),
      ...createUserDto,
      creationDate: new Date(),
      banned: false,
      roles: [RoleEnum.User],
    };
    users.push(newUser);
    return newUser;
  }

  getByEmail(email: string) {
    const user = users.find((el) => el.email === email);
    if (!user) {
      throw new NotFoundException('No user with this email!');
    }
    return user;
  }

  getById(id: string) {
    const user = users.find((el) => el.id === id);
    if (!user) {
      throw new NotFoundException('No user with this id!');
    }
    return user;
  }

  update(id: string, updateUserDto: BaseUserDto) {
    const oldUser = users.find((user) => user.id === id);
    if (!oldUser) {
      throw new NotFoundException('No user with this id to update!');
    }
    const index = users.indexOf(oldUser);
    const newUser = { ...oldUser, ...updateUserDto };
    users[index] = newUser;
    return newUser;
  }

  remove(id: string) {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException('No user with this id to remove!');
    }
    return users.splice(index, 1)[0];
  }

  addRole(addRoleDto: AddRoleDto) {
    const user = users.find((el) => el.id === addRoleDto.userId);
    if (!user) {
      throw new NotFoundException('No user with this id!');
    }
    if (user.roles.indexOf(addRoleDto.role) === -1) {
      user.roles.push(addRoleDto.role);
    }
    return user;
  }

  ban(banUserDto: BanUserDto) {
    const user = users.find((el) => el.id === banUserDto.userId);
    if (!user) {
      throw new NotFoundException('No user with this id to ban!');
    }
    user.banned = true;
    user.banReason = banUserDto.banReason;
    return user;
  }
}
