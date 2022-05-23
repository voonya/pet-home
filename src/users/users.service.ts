import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { users } from '@users/users';
import { UserDto } from '@users/dto/user.dto';
import { v4 as uuidv4 } from 'uuid';

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
}
