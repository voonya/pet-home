import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { users } from './users';
import { UserDto } from './dto/user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  getAll(): UserDto[] {
    return users;
  }

  createUser(createUserDto: CreateUserDto): UserDto {
    const newUser: UserDto = { id: uuidv4(), ...createUserDto };
    users.push(newUser);
    return newUser;
  }

  getUserByEmail(email: string): UserDto {
    return users.find((user) => user.email == email);
  }

  getUserById(id: string): UserDto {
    return users.find((user) => user.id == id);
  }
}
