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
import { AnimalsService } from 'common/models/animals/animals.service';
import { PaginationDto } from 'common/pipes/pagination/dto/pagination.dto';
import { BaseAnimalDto } from 'common/models/animals/dto/base-animal.dto';
import { PaginationPipe } from 'common/pipes/pagination/pagination.pipe';
import { ObjectIdValidationPipe } from 'common/pipes/object-id/objectid-validation.pipe';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { User } from 'common/decorators/user.decorator';
import { UserDto } from 'common/models/users/dto';

@Controller('animals')
@UseGuards(JwtAuthGuard)
export class AnimalsController {
  constructor(private animalsService: AnimalsService) {}

  @Post()
  create(@Body() createAnimalDto: BaseAnimalDto, @User() user: UserDto) {
    return this.animalsService.createAnimal(
      createAnimalDto,
      user._id.toString(),
    );
  }

  @Get()
  @UsePipes(new PaginationPipe(0, 10))
  getAll(@Query() pagination: PaginationDto, @User() user: UserDto) {
    return this.animalsService.getAll(pagination, user._id.toString());
  }

  @Get(':id')
  getById(
    @Param('id', ObjectIdValidationPipe) id: string,
    @User() user: UserDto,
  ) {
    return this.animalsService.getById(id, user._id.toString());
  }

  @Put(':id')
  update(
    @Body() updateAnimalDto: BaseAnimalDto,
    @Param('id', ObjectIdValidationPipe) id: string,
    @User() user: UserDto,
  ) {
    return this.animalsService.update(id, updateAnimalDto, user._id.toString());
  }

  @Delete(':id')
  remove(
    @Param('id', ObjectIdValidationPipe) id: string,
    @User() user: UserDto,
  ) {
    return this.animalsService.remove(id, user._id.toString());
  }
}
