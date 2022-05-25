import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AnimalDto, BaseAnimalDto } from '@animals/dto';
import { animals } from '@animals/animals';
import { PaginationDto } from 'pagination/dto/pagination.dto';
import { CreateAnimalDto } from '@animals/dto/create-animal.dto';
import { randomUUID } from 'crypto';
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
      throw new BadRequestException('You have reached maximum number of pets');
    }
    const newAnimal: AnimalDto = {
      id: randomUUID(),
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
      throw new NotFoundException('No animal with this id!');
    }
    return animal;
  }

  update(id: string, updateAnimalDto: BaseAnimalDto, userId: string) {
    const oldAnimal = animals.find(
      (animal) => animal.id === id && animal.ownerId === userId,
    );
    if (!oldAnimal) {
      throw new NotFoundException('No animal with this id to update!');
    }
    const index = animals.indexOf(oldAnimal);
    const newAnimal = { ...oldAnimal, ...updateAnimalDto };
    animals[index] = newAnimal;
    return newAnimal;
  }

  remove(id: string, userId: string) {
    const index = animals.findIndex(
      (animal) => animal.id === id && animal.ownerId === userId,
    );
    if (index === -1) {
      throw new NotFoundException('No animal with this id to remove!');
    }
    return animals.splice(index, 1)[0];
  }
}
