import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';

@Controller('animals')
export class AnimalsController {
  constructor(private animalsService: AnimalsService) {}

  @Post()
  create(@Body() animalDto: CreateAnimalDto) {
    return animalDto;
  }

  @Get()
  getAll() {
    return this.animalsService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.animalsService.getAnimalById(id);
  }
}
