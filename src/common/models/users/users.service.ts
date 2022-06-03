import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  AddRoleDto,
  BanUserDto,
  BaseUserDto,
  UserDto,
} from 'common/models/users/dto';
import { PaginationDto } from 'common/pipes/pagination/dto/pagination.dto';
import { RoleEnum } from 'common/models/users/role.enum';
import { IDataServices } from 'data-services/interfaces/idata-services';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDto } from './dto/update-password.dto';

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
    const user = await this.dataServices.users.getByEmail(createUserDto.email);
    if (user) {
      throw new BadRequestException('This email is already registered');
    }
    const hashedPassword = await this.hashPassword(createUserDto.password);

    const newUser: UserDto = {
      ...createUserDto,
      password: hashedPassword,
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

  async changePassword(userId: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.dataServices.users.getById(userId);

    const oldPasswordHash = await this.hashPassword(
      updatePasswordDto.oldPassword,
    );
    if (user.password !== oldPasswordHash) {
      throw new BadRequestException('Old password missmatched');
    }

    const newPasswordHash = await this.hashPassword(
      updatePasswordDto.newPassword,
    );
    return this.updatePassword(userId, newPasswordHash);
  }

  async chngeOthersPassword(userId: string, password: string) {
    const user = await this.dataServices.users.getById(userId);
    if (!user) {
      throw new NotFoundException('No user with this id!');
    }

    if (user.roles.includes(RoleEnum.Admin)) {
      throw new UnauthorizedException('Only admin can change own password');
    }

    const newPasswordHash = await this.hashPassword(password);
    return this.updatePassword(userId, newPasswordHash);
  }

  private async hashPassword(password: string) {
    return bcrypt.hash(password, Number(process.env.PASSWORD_SALT));
  }

  private async updatePassword(userId: string, newPassword: string) {
    const newPasswordHash = await this.hashPassword(newPassword);
    return this.dataServices.users.updatePassword(userId, newPasswordHash);
  }
}
