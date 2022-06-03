import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from 'common/models/users/users.service';
import { AddRoleDto, BanUserDto, BaseUserDto } from 'common/models/users/dto';
import { PaginationDto } from 'common/pipes/pagination/dto/pagination.dto';
import { PaginationPipe } from 'common/pipes/pagination/pagination.pipe';
import { ObjectIdValidationPipe } from 'common/pipes/object-id/objectid-validation.pipe';
import { RoleEnum } from 'common/models/users/role.enum';
import { Roles } from 'common/decorators/roles.decorator';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { ResponseUserDto } from 'common/models/users/dto/response-user.dto';
import { RoleGuard } from 'auth/guards/role.guard';

@Controller('users')
@UseGuards(JwtAuthGuard, RoleGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @Roles(RoleEnum.Admin)
  async create(@Body() createUserDto: BaseUserDto) {
    return new ResponseUserDto(await this.usersService.create(createUserDto));
  }

  @Get()
  @UsePipes(new PaginationPipe(0, 10))
  @Roles(RoleEnum.Admin)
  async getAll(@Query() pagination: PaginationDto) {
    const users = await this.usersService.getAll(pagination);
    return users.map((user) => new ResponseUserDto(user));
  }

  @Get(':id')
  @Roles(RoleEnum.Admin)
  async getById(@Param('id', ObjectIdValidationPipe) id: string) {
    return new ResponseUserDto(await this.usersService.getById(id));
  }

  @Put(':id')
  @Roles(RoleEnum.Admin)
  async update(
    @Body() updateUserDto: BaseUserDto,
    @Param('id', ObjectIdValidationPipe) id: string,
  ) {
    return new ResponseUserDto(
      await this.usersService.update(id, updateUserDto),
    );
  }

  @Delete(':id')
  @Roles(RoleEnum.Admin)
  async remove(@Param('id', ObjectIdValidationPipe) id: string) {
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

  @Put('password')
  @Roles(RoleEnum.Admin)
  changePassword() {
    return { message: 'Change Password' };
  }
}
