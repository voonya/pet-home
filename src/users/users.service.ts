import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AddRoleDto, BaseUserDto, UserDto, BanUserDto } from 'users/dto';
import { PaginationDto } from 'pagination/dto/pagination.dto';
import { RoleEnum } from 'users/role.enum';
import { IDataServices } from 'data-services/interfaces/idata-services';

@Injectable()
export class UsersService {
  constructor(private dataServices: IDataServices) {}

  async getAll(pagination: PaginationDto) {
    const users = await this.dataServices.users.getAll(
      pagination.offset,
      pagination.limit,
    );
    if (!users) {
      throw new InternalServerErrorException();
    }
    return users;
  }

  async create(createUserDto: BaseUserDto) {
    const newUser: UserDto = {
      ...createUserDto,
      creationDate: new Date(),
      banned: false,
      roles: [RoleEnum.User],
    };
    const userAdded = await this.dataServices.users.create(newUser);
    if (!userAdded) {
      throw new InternalServerErrorException();
    }
    return userAdded;
  }

  async getByEmail(email: string) {
    const user = await this.dataServices.users.getByEmail(email);
    if (!user) {
      throw new NotFoundException('No user with this email!');
    }
    return user;
  }

  async getById(id: string) {
    const user = await this.dataServices.users.getById(id);
    if (!user) {
      throw new NotFoundException('No user with this id!');
    }
    return user;
  }

  async update(id: string, updateUserDto: BaseUserDto) {
    const savedUser = await this.dataServices.users.update(id, updateUserDto);
    if (!savedUser) {
      throw new InternalServerErrorException();
    }
    return savedUser;
  }

  async remove(id: string) {
    const removedUser = await this.dataServices.users.remove(id);
    if (!removedUser) {
      throw new NotFoundException('No user with this id to remove!');
    }
    return removedUser;
  }

  async addRole(userId: string, addRoleDto: AddRoleDto) {
    const savedUser = await this.dataServices.users.addRole(userId, addRoleDto);
    if (!savedUser) {
      throw new NotFoundException('No user with this id to add role!');
    }
    return savedUser;
  }

  async ban(userId: string, banUserDto: BanUserDto) {
    const bannedUser = await this.dataServices.users.ban(userId, banUserDto);
    if (!bannedUser) {
      throw new NotFoundException('No user with this id to ban!');
    }
    return bannedUser;
  }
}
