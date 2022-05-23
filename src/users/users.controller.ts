import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from '@users/users.service';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { UpdateUserDto } from '@users/dto/update-user.dto';
import { UserDto } from '@users/dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): UserDto {
    return this.usersService.create(createUserDto);
  }

  @Get()
  getAll(): UserDto[] {
    return this.usersService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): UserDto {
    return this.usersService.getById(id);
  }

  @Put(':id')
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: string,
  ): UserDto {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): UserDto {
    return this.usersService.remove(id);
  }
}
