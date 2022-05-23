import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AnimalDto, CreateAnimalDto, UpdateAnimalDto } from '@animals/dto';
import { v4 as uuidv4 } from 'uuid';
import { animals } from '@animals/animals';
import { PaginationDto } from 'pagination/dto/pagination.dto';

const maxAnimalsPerUser = 10;

@Injectable()
export class AnimalsService {
  getAll(pagination: PaginationDto, userId: string) {
    return animals
      .filter((animal) => animal.ownerId == userId)
      .slice(pagination.offset, pagination.offset + pagination.limit);
  }

  createAnimal(createAnimalDto: CreateAnimalDto, userId: string) {
    const currentNumberOfUserAnimals = animals.filter(
      (animal) => animal.ownerId === userId,
    ).length;
    if (currentNumberOfUserAnimals >= maxAnimalsPerUser) {
      throw new HttpException(
        'You have reached maximum number of pets',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newAnimal: AnimalDto = {
      id: uuidv4(),
      ...createAnimalDto,
      creationDate: new Date(),
      ownerId: userId,
    };
    animals.push(newAnimal);
    return newAnimal;
  }

  getById(id: string, userId: string) {
    const animal = animals.find((el) => el.id === id && el.ownerId === userId);
    if (!animal) {
      throw new BadRequestException('No animal with this id!');
    }
    return animal;
  }

  update(id: string, updateAnimalDto: UpdateAnimalDto, userId: string) {
    const oldAnimal = animals.find(
      (animal) => animal.id === id && animal.ownerId === userId,
    );
    if (!oldAnimal) {
      throw new BadRequestException('No animal with this id to update!');
    }
    const index = animals.indexOf(oldAnimal);
    const newAnimal = { ...oldAnimal, ...updateAnimalDto };
    animals[index] = newAnimal;
    return newAnimal;
  }

  remove(id: string, userId: string) {
    const animalIndex = animals.findIndex(
      (animal) => animal.id === id && animal.ownerId === userId,
    );
    if (animalIndex === -1) {
      throw new BadRequestException('No animal with this id to remove!');
    }
    return animals.splice(animalIndex, 1)[0];
  }
}
