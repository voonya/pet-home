import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { users } from './users';
import { UserDto } from './dto/user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  getAll() {
    return users;
  }

  createUser(createUserDto: CreateUserDto) {
    const newUser: UserDto = { id: uuidv4(), ...createUserDto };
    users.push(newUser);
    return newUser;
  }
}
