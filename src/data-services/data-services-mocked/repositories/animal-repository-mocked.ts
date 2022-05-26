import { IAnimalRepository } from 'data-services/interfaces/ianimal-repository';
import { AnimalDto } from 'animals/dto';

export class AnimalRepositoryMocked implements IAnimalRepository {
  constructor(arrayMock: AnimalDto[]) {
    this._array = arrayMock;
  }

  private readonly _array: AnimalDto[];

  getAll(userId: string): Promise<AnimalDto[]> {
    return Promise.resolve(
      this._array.filter((animal) => animal.ownerId == userId),
    );
  }

  getById(id: string, userId: string): Promise<AnimalDto | null | undefined> {
    return Promise.resolve(
      this._array.find((el) => el.id === id && el.ownerId === userId),
    );
  }

  create(dto: AnimalDto): Promise<AnimalDto> {
    this._array.push(dto);
    return Promise.resolve(dto);
  }

  async update(
    id: string,
    dto: AnimalDto,
  ): Promise<AnimalDto | null | undefined> {
    const oldAnimal = await this.getById(id, dto.ownerId);
    if (!oldAnimal) {
      return Promise.resolve(null);
    }
    const index = this._array.indexOf(oldAnimal);
    this._array[index] = dto;
    return Promise.resolve(dto);
  }

  async remove(
    id: string,
    userId: string,
  ): Promise<AnimalDto | null | undefined> {
    const oldItem = await this.getById(id, userId);
    if (!oldItem) {
      return Promise.resolve(null);
    }
    const index = this._array.indexOf(oldItem);
    return Promise.resolve(this._array.splice(index, 1)[0]);
  }
}
