import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AnimalsService } from '@animals/animals.service';
import { CreateAnimalDto, UpdateAnimalDto } from '@animals/dto';
import { PaginationDto } from 'pagination/dto/pagination.dto';

const mockUserId = '123e4567-e89b-12d3-a456-426614174000'; // get id from auth

@Controller('animals')
export class AnimalsController {
  constructor(private animalsService: AnimalsService) {}

  @Post()
  create(@Body() createAnimalDto: CreateAnimalDto) {
    return this.animalsService.createAnimal(createAnimalDto, mockUserId);
  }

  @Get()
  getAll(@Query() pagination: PaginationDto) {
    return this.animalsService.getAll(pagination, mockUserId);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.animalsService.getById(id, mockUserId);
  }

  @Put(':id')
  update(@Body() updateAnimalDto: UpdateAnimalDto, @Param('id') id: string) {
    return this.animalsService.update(id, updateAnimalDto, mockUserId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animalsService.remove(id, mockUserId);
  }
}
