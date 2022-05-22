import { Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { AnimalDto } from './dto/animal.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AnimalsService {
  getAll(): AnimalDto[] {
    return [];
  }

  createAnimal(createAnimalDto: CreateAnimalDto): AnimalDto {
    return { id: uuidv4(), ...createAnimalDto };
  }

  getAnimalById(id: string): AnimalDto {
    return {
      breed: '',
      description: '',
      id: id,
      name: '',
      ownerId: '',
      type: undefined,
    };
  }
}
