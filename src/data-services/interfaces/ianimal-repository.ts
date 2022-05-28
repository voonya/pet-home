import { AnimalDto, BaseAnimalDto } from 'animals/dto';

export interface IAnimalRepository {
  getAll(userId: string, offset?: number, limit?: number): Promise<AnimalDto[]>;

  getById(id: string, userId: string): Promise<AnimalDto | null | undefined>;

  create(dto: AnimalDto): Promise<AnimalDto>;

  update(
    id: string,
    userId: string,
    dto: BaseAnimalDto,
  ): Promise<AnimalDto | null | undefined>;

  remove(id: string, userId: string): Promise<AnimalDto | null | undefined>;
}
