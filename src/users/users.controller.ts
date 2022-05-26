import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from 'users/users.service';
import { AddRoleDto, BanUserDto, BaseUserDto } from 'users/dto';
import { PaginationDto } from 'pagination/dto/pagination.dto';
import { PaginationPipe } from 'pagination/pagination.pipe';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: BaseUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UsePipes(new PaginationPipe(0, 10))
  getAll(@Query() pagination: PaginationDto) {
    return this.usersService.getAll(pagination);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.usersService.getById(id);
  }

  @Put(':id')
  update(@Body() updateUserDto: BaseUserDto, @Param('id') id: string) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post('/role')
  addRole(@Body() addRoleDto: AddRoleDto) {
    return this.usersService.addRole(addRoleDto);
  }

  @Post(':id/ban')
  ban(@Param('id') id: string, @Body() banUserDto: BanUserDto) {
    return this.usersService.ban(id, banUserDto);
  }
}
