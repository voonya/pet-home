import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AnimalDto, BaseAnimalDto } from 'common/models/animals/dto';
import { PaginationDto } from 'common/pipes/pagination/dto/pagination.dto';
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

  async createAnimal(createAnimalDto: BaseAnimalDto, userId: string) {
    const allAnimals = await this.dataServices.animals.getAll(userId);
    const currentNumberOfUserAnimals = allAnimals.filter(
      (animal) => animal.ownerId === userId,
    ).length;
    if (currentNumberOfUserAnimals >= maxAnimalsPerUser) {
      throw new BadRequestException('You have reached maximum number of pets');
    }
    const newAnimal: AnimalDto = {
      ...createAnimalDto,
      creationDate: new Date(),
      ownerId: userId,
    };
    const savedAnimal = await this.dataServices.animals.create(newAnimal);
    if (!savedAnimal) {
      throw new InternalServerErrorException();
    }
    return savedAnimal;
  }

  async getById(id: string, userId: string) {
    const animal = await this.dataServices.animals.getById(id, userId);
    if (!animal) {
      throw new NotFoundException('No animal with this id!');
    }
    return animal;
  }

  async update(id: string, updateAnimalDto: BaseAnimalDto, userId: string) {
    const animal = await this.getById(id, userId);
    if (animal.ownerId !== userId) {
      throw new BadRequestException(
        'User cannot update this animal, it not his',
      );
    }
    const savedAnimal = await this.dataServices.animals.update(
      id,
      userId,
      updateAnimalDto,
    );
    if (!savedAnimal) {
      throw new InternalServerErrorException();
    }
    return savedAnimal;
  }

  async remove(id: string, userId: string) {
    const removedAnimal = await this.dataServices.animals.remove(id, userId);
    if (!removedAnimal) {
      throw new NotFoundException('No animal with this id to remove!');
    }
    return removedAnimal;
  }
}
