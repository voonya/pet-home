import { IAnimalRepository } from 'data-services/interfaces/ianimal-repository';
import { AnimalDto, BaseAnimalDto } from 'animals/dto';

export class AnimalRepositoryMocked implements IAnimalRepository {
  constructor(arrayMock: AnimalDto[]) {
    this._array = arrayMock;
  }

  private readonly _array: AnimalDto[];

  getAll(
    userId: string,
    offset?: number,
    limit?: number,
  ): Promise<AnimalDto[]> {
    let animals = this._array.filter((animal) => animal.ownerId == userId);
    if (offset && limit) {
      animals = animals.slice(offset, offset + limit);
    }
    return Promise.resolve(animals);
  }

  getById(id: string, userId: string): Promise<AnimalDto | null | undefined> {
    return Promise.resolve(
      this._array.find((el) => el._id === id && el.ownerId === userId),
    );
  }

  create(dto: AnimalDto): Promise<AnimalDto> {
    this._array.push(dto);
    return Promise.resolve(dto);
  }

  async update(
    id: string,
    userId: string,
    dto: BaseAnimalDto,
  ): Promise<AnimalDto | null | undefined> {
    const oldAnimal = await this.getById(id, userId);
    if (!oldAnimal) {
      return Promise.resolve(null);
    }
    const index = this._array.indexOf(oldAnimal);
    const newAnimal = { ...oldAnimal, ...dto };
    this._array[index] = newAnimal;
    return Promise.resolve(newAnimal);
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
