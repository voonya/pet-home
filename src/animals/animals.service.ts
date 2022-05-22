import { Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { AnimalDto } from './dto/animal.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { animals } from './animals';

@Injectable()
export class AnimalsService {
  getAll(): AnimalDto[] {
    return animals;
  }

  createAnimal(createAnimalDto: CreateAnimalDto): AnimalDto {
    const newAnimal: AnimalDto = { id: uuidv4(), ...createAnimalDto };
    animals.push(newAnimal);
    return newAnimal;
  }

  getById(id: string): AnimalDto {
    return animals.find((animal) => animal.id === id);
  }

  update(id: string, updateAnimalDto: UpdateAnimalDto): AnimalDto {
    const oldAnimal = animals.find((animal) => animal.id === id);
    const index = animals.indexOf(oldAnimal);
    const newAnimal = { ...oldAnimal, ...updateAnimalDto };
    animals[index] = newAnimal;
    return newAnimal;
  }

  remove(id: string): AnimalDto {
    const animalToRemove = animals.find((animal) => animal.id === id);
    const index = animals.indexOf(animalToRemove);
    if (index !== -1) {
      animals.splice(index, 1);
    }
    return animalToRemove;
  }
}
