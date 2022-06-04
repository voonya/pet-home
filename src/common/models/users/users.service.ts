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
  UpdateUserDto,
} from 'common/models/users/dto';
import { PaginationDto } from 'common/pipes/pagination/dto/pagination.dto';
import { RoleEnum } from 'common/models/users/role.enum';
import { IDataServices } from 'data-services/interfaces/idata-services';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDto } from 'common/models/users/dto/update-password.dto';
import { UpdateOthersPassword } from 'common/models/users/dto/update-others-password.dto';
import { TokenService } from 'auth/services/token/token.service';

@Injectable()
export class UsersService {
  constructor(
    private dataServices: IDataServices,
    private tokenService: TokenService,
  ) {}

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

  async update(id: string, updateUserDto: UpdateUserDto) {
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
    await this.tokenService.removeToken(id);
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
    const user = await this.getById(userId);
    const compareResult = await bcrypt.compare(
      updatePasswordDto.oldPassword,
      user.password,
    );
    if (!compareResult) {
      throw new BadRequestException('Old password missmatched');
    }
    await this.tokenService.removeToken(userId);
    return this.updatePassword(userId, updatePasswordDto.newPassword);
  }

  async changeOthersPassword(updatePasswordDto: UpdateOthersPassword) {
    const user = await this.getByEmail(updatePasswordDto.email);

    if (user.roles.includes(RoleEnum.Admin)) {
      throw new UnauthorizedException('Only admin can change own password');
    }
    await this.tokenService.removeToken(user._id);
    return this.updatePassword(user._id, updatePasswordDto.password);
  }

  private async hashPassword(password: string) {
    return bcrypt.hash(password, Number(process.env.PASSWORD_SALT));
  }

  private async updatePassword(userId: string, newPassword: string) {
    const newPasswordHash = await this.hashPassword(newPassword);
    return this.dataServices.users.updatePassword(userId, newPasswordHash);
  }
}
