import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { users } from '@users/users';
import { UserDto } from '@users/dto/user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from '@users/dto/update-user.dto';

@Injectable()
export class UsersService {
  getAll(): UserDto[] {
    return users;
  }

  create(createUserDto: CreateUserDto): UserDto {
    const newUser: UserDto = { id: uuidv4(), ...createUserDto };
    users.push(newUser);
    return newUser;
  }

  getByEmail(email: string): UserDto {
    return users.find((user) => user.email == email);
  }

  getById(id: string): UserDto {
    return users.find((user) => user.id == id);
  }

  update(id: string, updateUserDto: UpdateUserDto): UserDto {
    const oldUser = users.find((user) => user.id === id);
    const index = users.indexOf(oldUser);
    const newUser = { ...oldUser, ...updateUserDto };
    users[index] = newUser;
    return newUser;
  }

  remove(id: string): UserDto {
    const userToRemove = users.find((user) => user.id === id);
    const index = users.indexOf(userToRemove);
    if (index !== -1) {
      users.splice(index, 1);
    }
    return userToRemove;
  }
}
