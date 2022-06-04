import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from 'common/models/users/users.service';
import {
  AddRoleDto,
  BanUserDto,
  BaseUserDto,
  UserDto,
} from 'common/models/users/dto';
import { PaginationDto } from 'common/pipes/pagination/dto/pagination.dto';
import { PaginationPipe } from 'common/pipes/pagination/pagination.pipe';
import { ObjectIdValidationPipe } from 'common/pipes/object-id/objectid-validation.pipe';
import { RoleEnum } from 'common/models/users/role.enum';
import { Roles } from 'common/decorators/roles.decorator';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { ResponseUserDto } from 'common/models/users/dto/response-user.dto';
import { RoleGuard } from 'auth/guards/role.guard';
import { User } from 'common/decorators/user.decorator';
import { UpdatePasswordDto } from 'common/models/users/dto/update-password.dto';
import { UpdateOthersPassword } from 'common/models/users/dto/update-others-password.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, RoleGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  private static checkIfUserIsAllowed(userId: string, authUser: UserDto): void {
    if (userId == authUser._id.toString()) {
      return;
    }
    if (!authUser.roles.includes(RoleEnum.Admin)) {
      throw new ForbiddenException();
    }
  }

  @Put('change-password-by-email')
  @Roles(RoleEnum.Admin)
  async changeOthersPassword(@Body() updatePasswordDto: UpdateOthersPassword) {
    return new ResponseUserDto(
      await this.usersService.changeOthersPassword(updatePasswordDto),
    );
  }

  @Put('change-password')
  async changePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @User() user: UserDto,
  ) {
    return new ResponseUserDto(
      await this.usersService.changePassword(user._id, updatePasswordDto),
    );
  }

  @Get()
  @UsePipes(new PaginationPipe(0, 10))
  @Roles(RoleEnum.Admin)
  async getAll(@Query() pagination: PaginationDto) {
    const users = await this.usersService.getAll(pagination);
    return users.map((user) => new ResponseUserDto(user));
  }

  @Get(':id')
  async getById(@Param('id', ObjectIdValidationPipe) id: string) {
    return new ResponseUserDto(await this.usersService.getById(id));
  }

  @Put(':id')
  async update(
    @Body() updateUserDto: BaseUserDto,
    @Param('id', ObjectIdValidationPipe) id: string,
    @User() authUser: UserDto,
  ) {
    UsersController.checkIfUserIsAllowed(id, authUser);
    return new ResponseUserDto(
      await this.usersService.update(id, updateUserDto),
    );
  }

  @Delete(':id')
  async remove(
    @Param('id', ObjectIdValidationPipe) id: string,
    @User() authUser: UserDto,
  ) {
    UsersController.checkIfUserIsAllowed(id, authUser);
    return new ResponseUserDto(await this.usersService.remove(id));
  }

  @Post(':id/role')
  @Roles(RoleEnum.Admin)
  async addRole(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() addRoleDto: AddRoleDto,
  ) {
    return new ResponseUserDto(await this.usersService.addRole(id, addRoleDto));
  }

  @Post(':id/ban')
  @Roles(RoleEnum.Admin)
  async ban(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() banUserDto: BanUserDto,
  ) {
    return new ResponseUserDto(await this.usersService.ban(id, banUserDto));
  }
}
