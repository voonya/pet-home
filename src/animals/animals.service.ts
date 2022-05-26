import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AnimalDto, BaseAnimalDto } from 'animals/dto';
import { PaginationDto } from 'pagination/dto/pagination.dto';
import { CreateAnimalDto } from 'animals/dto/create-animal.dto';
import { randomUUID } from 'crypto';
import { IDataServices } from 'data-services/interfaces/idata-services';
const maxAnimalsPerUser = 10;

@Injectable()
export class AnimalsService {
  constructor(private dataServices: IDataServices) {}

  async getAll(pagination: PaginationDto, userId: string) {
    const animals = await this.dataServices.animals.getAll(
      userId,
      pagination.offset,
      pagination.limit,
    );
    if (!animals) {
      throw new InternalServerErrorException();
    }
    return animals;
  }

  async createAnimal(createAnimalDto: CreateAnimalDto, userId: string) {
    const allAnimals = await this.dataServices.animals.getAll(userId);
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
    const savedAnimal = await this.dataServices.animals.create(newAnimal);
    if (!savedAnimal) {
      throw new InternalServerErrorException();
    }
    return newAnimal;
  }

  async getById(id: string, userId: string) {
    const animal = await this.dataServices.animals.getById(id, userId);
    if (!animal) {
      throw new NotFoundException('No animal with this id!');
    }
    return animal;
  }

  async update(id: string, updateAnimalDto: BaseAnimalDto, userId: string) {
    const oldAnimal = await this.getById(id, userId);
    const newAnimal = { ...oldAnimal, ...updateAnimalDto };
    const savedAnimal = await this.dataServices.animals.update(id, newAnimal);
    if (!savedAnimal) {
      throw new InternalServerErrorException();
    }
    return newAnimal;
  }

  async remove(id: string, userId: string) {
    const removedAnimal = await this.dataServices.animals.remove(id, userId);
    if (!removedAnimal) {
      throw new NotFoundException('No animal with this id to remove!');
    }
    return removedAnimal;
  }
}
