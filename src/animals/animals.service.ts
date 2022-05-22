import { Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { AnimalDto } from './dto/animal.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateAnimalDto } from './dto/update-animal.dto';

@Injectable()
export class AnimalsService {
  getAll(): AnimalDto[] {
    return [];
  }

  createAnimal(createAnimalDto: CreateAnimalDto): AnimalDto {
    return { id: uuidv4(), ...createAnimalDto };
  }

  getById(id: string): AnimalDto {
    return {
      breed: '',
      description: '',
      id: id,
      name: '',
      ownerId: '',
      type: undefined,
    };
  }

  update(id: string, animalDto: UpdateAnimalDto): AnimalDto {
    return { id: id, ownerId: '', ...animalDto };
  }

  remove(id: string): AnimalDto {
    return {
      breed: 'some',
      description: '',
      id: id,
      name: '',
      ownerId: '',
      type: undefined,
    };
  }
}
