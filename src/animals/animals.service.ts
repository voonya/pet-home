import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AnimalDto, BaseAnimalDto } from 'animals/dto';
import { PaginationDto } from 'pagination/dto/pagination.dto';
import { CreateAnimalDto } from 'animals/dto/create-animal.dto';
import { randomUUID } from 'crypto';
import { IDataServices } from 'data-services/idata-services';
const maxAnimalsPerUser = 10;

@Injectable()
export class AnimalsService {
  constructor(private dataServices: IDataServices) {}

  async getAll(pagination: PaginationDto, userId: string) {
    const allAnimals = await this.dataServices.animals.getAll();
    return allAnimals
      .filter((animal) => animal.ownerId == userId)
      .slice(pagination.offset, pagination.offset + pagination.limit);
  }

  async createAnimal(createAnimalDto: CreateAnimalDto, userId: string) {
    const allAnimals = await this.dataServices.animals.getAll();
    const currentNumberOfUserAnimals = allAnimals.filter(
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
    await this.dataServices.animals.create(newAnimal);
    return newAnimal;
  }

  async getById(id: string, userId: string) {
    const animal = await this.dataServices.animals.get(id);
    if (!animal) {
      throw new NotFoundException('No animal with this id!');
    }
    if (animal.ownerId != userId) {
      throw new BadRequestException('No animal of this user');
    }
    return animal;
  }

  async update(id: string, updateAnimalDto: BaseAnimalDto, userId: string) {
    const oldAnimal = await this.getById(id, userId);
    const newAnimal = { ...oldAnimal, ...updateAnimalDto };
    await this.dataServices.animals.update(newAnimal.id, newAnimal);
    return newAnimal;
  }

  async remove(id: string, userId: string) {
    const animal = await this.getById(id, userId);
    if (animal.ownerId != userId) {
      throw new BadRequestException('No animal of this user');
    }
    const removedAnimal = await this.dataServices.animals.delete(id);
    if (!removedAnimal) {
      throw new NotFoundException('No animal with this id to remove!');
    }
    return removedAnimal;
  }
}
