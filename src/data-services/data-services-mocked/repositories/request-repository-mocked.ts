import { IRequestRepository } from 'data-services/interfaces/irequest-repository';
import { RequestDto } from 'requests/dto';

export class RequestRepositoryMocked implements IRequestRepository {
  constructor(private _array: RequestDto[]) {}

  async getAll(): Promise<RequestDto[]> {
    return Promise.resolve(this._array);
  }

  async getById(id: string): Promise<RequestDto> {
    return Promise.resolve(this._array.find((p) => p.id === id));
  }

  async create(dto: RequestDto): Promise<RequestDto> {
    this._array.push(dto);
    return Promise.resolve(dto);
  }

  async update(id: string, dto: RequestDto): Promise<RequestDto | undefined> {
    const oldrequest = await this.getById(id);
    const index = this._array.indexOf(oldrequest);
    this._array[index] = dto;
    return Promise.resolve(dto);
  }

  async remove(id: string): Promise<RequestDto | undefined> {
    const oldrequest = await this.getById(id);
    const index = this._array.indexOf(oldrequest);
    return Promise.resolve(this._array.splice(index, 1)[0]);
  }
}
