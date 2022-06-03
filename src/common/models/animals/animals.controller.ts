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
import { UserId } from 'common/decorators/userId.decorator';

@Controller('animals')
@UseGuards(JwtAuthGuard)
export class AnimalsController {
  constructor(private animalsService: AnimalsService) {}

  @Post()
  create(@Body() createAnimalDto: BaseAnimalDto, @UserId() userId: string) {
    return this.animalsService.createAnimal(createAnimalDto, userId);
  }

  @Get()
  @UsePipes(new PaginationPipe(0, 10))
  getAll(@Query() pagination: PaginationDto, @UserId() userId: string) {
    return this.animalsService.getAll(pagination, userId);
  }

  @Get(':id')
  getById(
    @Param('id', ObjectIdValidationPipe) id: string,
    @UserId() userId: string,
  ) {
    return this.animalsService.getById(id, userId);
  }

  @Put(':id')
  update(
    @Body() updateAnimalDto: BaseAnimalDto,
    @Param('id', ObjectIdValidationPipe) id: string,
    @UserId() userId: string,
  ) {
    return this.animalsService.update(id, updateAnimalDto, userId);
  }

  @Delete(':id')
  remove(
    @Param('id', ObjectIdValidationPipe) id: string,
    @UserId() userId: string,
  ) {
    return this.animalsService.remove(id, userId);
  }
}
