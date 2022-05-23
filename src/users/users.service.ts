import { Injectable } from '@nestjs/common';
import { UserDto, CreateUserDto, UpdateUserDto } from '@users/dto';
import { users } from '@users/users';
import { v4 as uuidv4 } from 'uuid';
import { PaginationDto } from 'pagination/dto/pagination.dto';

@Injectable()
export class UsersService {
  getAll(pagination: PaginationDto) {
    return users.slice(pagination.offset, pagination.offset + pagination.limit);
  }

  create(createUserDto: CreateUserDto) {
    const newUser: UserDto = {
      id: uuidv4(),
      ...createUserDto,
      creationDate: new Date(),
    };
    users.push(newUser);
    return newUser;
  }

  getByEmail(email: string) {
    return users.find((user) => user.email === email);
  }

  getById(id: string) {
    return users.find((user) => user.id === id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const oldUser = users.find((user) => user.id === id);
    const index = users.indexOf(oldUser);
    const newUser = { ...oldUser, ...updateUserDto };
    users[index] = newUser;
    return newUser;
  }

  remove(id: string) {
    const userToRemove = users.find((user) => user.id === id);
    const index = users.indexOf(userToRemove);
    if (index !== -1) {
      users.splice(index, 1);
    }
    return userToRemove;
  }
}
