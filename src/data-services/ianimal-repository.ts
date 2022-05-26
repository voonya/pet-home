import { AnimalDto } from 'animals/dto';

export abstract class IAnimalRepository {
  abstract getAll(userId: string): Promise<AnimalDto[]>;

  abstract getById(
    id: string,
    userId: string,
  ): Promise<AnimalDto | null | undefined>;

  abstract create(dto: AnimalDto): Promise<AnimalDto>;

  abstract update(
    id: string,
    dto: AnimalDto,
  ): Promise<AnimalDto | null | undefined>;

  abstract remove(
    id: string,
    userId: string,
  ): Promise<AnimalDto | null | undefined>;
}
