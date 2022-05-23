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
import { CreateAnimalDto } from '@animals/dto/create-animal.dto';
import { UpdateAnimalDto } from '@animals/dto/update-animal.dto';
import { PaginationDto } from 'pagination/dto/pagination.dto';

@Controller('animals')
export class AnimalsController {
  constructor(private animalsService: AnimalsService) {}

  @Post()
  create(@Body() createAnimalDto: CreateAnimalDto) {
    return this.animalsService.createAnimal(createAnimalDto);
  }

  @Get()
  getAll(@Query() pagination: PaginationDto) {
    return this.animalsService.getAll(pagination);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.animalsService.getById(id);
  }

  @Put(':id')
  update(@Body() updateAnimalDto: UpdateAnimalDto, @Param('id') id: string) {
    return this.animalsService.update(id, updateAnimalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animalsService.remove(id);
  }
}
