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
import { CreateAnimalDto } from 'animals/dto/create-animal.dto';
import { PaginationPipe } from 'pagination/pagination.pipe';
const mockUserId = '123e4567-e89b-12d3-a456-426614174000'; // get id from auth

@Controller('animals')
export class AnimalsController {
  constructor(private animalsService: AnimalsService) {}

  @Post()
  create(@Body() createAnimalDto: CreateAnimalDto) {
    return this.animalsService.createAnimal(createAnimalDto, mockUserId);
  }

  @Get()
  @UsePipes(new PaginationPipe(0, 10))
  getAll(@Query() pagination: PaginationDto) {
    return this.animalsService.getAll(pagination, mockUserId);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.animalsService.getById(id, mockUserId);
  }

  @Put(':id')
  update(@Body() updateAnimalDto: BaseAnimalDto, @Param('id') id: string) {
    return this.animalsService.update(id, updateAnimalDto, mockUserId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animalsService.remove(id, mockUserId);
  }
}
