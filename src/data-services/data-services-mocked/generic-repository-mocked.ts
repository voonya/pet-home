import { IGenericRepository } from 'data-services/igeneric-repository';

export class RepositoryMock<T extends { id: string }>
  implements IGenericRepository<T>
{
  constructor(arrayMock: T[]) {
    this._array = arrayMock;
  }

  private readonly _array: T[];

  create(item: T): Promise<T> {
    this._array.push(item);
    return Promise.resolve(item);
  }

  get(id: string): Promise<T> {
    return Promise.resolve(this._array.find((item) => item.id === id));
  }

  getAll(): Promise<T[]> {
    return Promise.resolve(this._array);
  }

  async update(id: string, item: T): Promise<T> {
    const oldItem = await this.get(id);
    if (!oldItem) {
      return Promise.resolve(null);
    }
    const index = this._array.indexOf(oldItem);
    this._array[index] = item;
    return Promise.resolve(item);
  }

  async delete(id: string): Promise<T> {
    const oldItem = await this.get(id);
    if (!oldItem) {
      return Promise.resolve(null);
    }
    const index = this._array.indexOf(oldItem);
    return Promise.resolve(this._array.splice(index, 1)[0]);
  }
}
