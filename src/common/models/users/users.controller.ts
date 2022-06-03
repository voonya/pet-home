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
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserId } from 'common/decorators/userId.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @Roles(RoleEnum.Admin)
  create(@Body() createUserDto: BaseUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UsePipes(new PaginationPipe(0, 10))
  @Roles(RoleEnum.Admin)
  getAll(@Query() pagination: PaginationDto) {
    return this.usersService.getAll(pagination);
  }

  @Get(':id')
  @Roles(RoleEnum.Admin)
  getById(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.usersService.getById(id);
  }

  @Put(':id')
  @Roles(RoleEnum.Admin)
  update(
    @Body() updateUserDto: BaseUserDto,
    @Param('id', ObjectIdValidationPipe) id: string,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(RoleEnum.Admin)
  remove(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.usersService.remove(id);
  }

  @Post(':id/role')
  @Roles(RoleEnum.Admin)
  addRole(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() addRoleDto: AddRoleDto,
  ) {
    return this.usersService.addRole(id, addRoleDto);
  }

  @Post(':id/ban')
  @Roles(RoleEnum.Admin)
  ban(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() banUserDto: BanUserDto,
  ) {
    return this.usersService.ban(id, banUserDto);
  }

  @Put('changePassword/:password')
  @Roles(RoleEnum.User)
  changePassword(
    @Param('password') updatePasswordDto: UpdatePasswordDto,
    @UserId() userId: string,
  ) {
    return this.usersService.changePassword(userId, updatePasswordDto);
  }

  @Put(':id/changePassword/:password')
  @Roles(RoleEnum.Admin)
  changeOthersPassword(
    @Param('password') password: string,
    @Param('id') userId: string,
  ) {
    return this.usersService.chngeOthersPassword(userId, password);
  }
}
