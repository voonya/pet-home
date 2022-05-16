import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  getAll() {
    return [];
  }

  createUser(userDto: CreateUserDto) {
    return userDto;
  }
}
