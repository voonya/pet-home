import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDto, BaseUserDto } from '@users/dto';
import { users } from '@users/users';
import { randomUUID } from 'crypto';
import { PaginationDto } from 'pagination/dto/pagination.dto';

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
    };
    users.push(newUser);
    return newUser;
  }

  getByEmail(email: string) {
    const user = users.find((el) => el.email === email);
    if (!user) {
      throw new BadRequestException('No user with this email!');
    }
    return user;
  }

  getById(id: string) {
    const user = users.find((el) => el.id === id);
    if (!user) {
      throw new BadRequestException('No user with this id!');
    }
    return user;
  }

  update(id: string, updateUserDto: BaseUserDto) {
    const oldUser = users.find((user) => user.id === id);
    if (!oldUser) {
      throw new BadRequestException('No user with this id to update!');
    }
    const index = users.indexOf(oldUser);
    const newUser = { ...oldUser, ...updateUserDto };
    users[index] = newUser;
    return newUser;
  }

  remove(id: string) {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new BadRequestException('No user with this id to remove!');
    }
    return users.splice(index, 1)[0];
  }
}
