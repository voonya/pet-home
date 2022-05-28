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
import { AnimalsService } from 'animals/animals.service';
import { PaginationDto } from 'pagination/dto/pagination.dto';
import { BaseAnimalDto } from 'animals/dto/base-animal.dto';
import { PaginationPipe } from 'pagination/pagination.pipe';
import { ObjectIdValidationPipe } from 'middlewares/objectid-validation.pipe';

const mockUserId = '62911964a7afaf9b1059a2ff'; // get id from auth

@Controller('animals')
export class AnimalsController {
  constructor(private animalsService: AnimalsService) {}

  @Post()
  create(@Body() createAnimalDto: BaseAnimalDto) {
    return this.animalsService.createAnimal(createAnimalDto, mockUserId);
  }

  @Get()
  @UsePipes(new PaginationPipe(0, 10))
  getAll(@Query() pagination: PaginationDto) {
    return this.animalsService.getAll(pagination, mockUserId);
  }

  @Get(':id')
  getById(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.animalsService.getById(id, mockUserId);
  }

  @Put(':id')
  update(
    @Body() updateAnimalDto: BaseAnimalDto,
    @Param('id', ObjectIdValidationPipe) id: string,
  ) {
    return this.animalsService.update(id, updateAnimalDto, mockUserId);
  }

  @Delete(':id')
  remove(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.animalsService.remove(id, mockUserId);
  }
}
