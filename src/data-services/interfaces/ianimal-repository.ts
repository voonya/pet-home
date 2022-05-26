import { AnimalDto } from 'animals/dto';

export interface IAnimalRepository {
  getAll(userId: string): Promise<AnimalDto[]>;

  getById(id: string, userId: string): Promise<AnimalDto | null | undefined>;

  create(dto: AnimalDto): Promise<AnimalDto>;

  update(id: string, dto: AnimalDto): Promise<AnimalDto | null | undefined>;

  remove(id: string, userId: string): Promise<AnimalDto | null | undefined>;
}
