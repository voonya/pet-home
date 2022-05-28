import { IRequestRepository } from 'data-services/interfaces/irequest-repository';
import { RequestDto, RequestQueryDto } from 'requests/dto';

export class RequestRepositoryMocked implements IRequestRepository {
  constructor(private _array: RequestDto[]) {}

  async getAll(filter: RequestQueryDto = {}): Promise<RequestDto[]> {
    let allRecords = this._array;

    if (filter.id) {
      allRecords = allRecords.filter((p) => p.id === filter.id);
    }
    if (filter.animalId) {
      allRecords = allRecords.filter((p) => p.animalId === filter.animalId);
    }
    if (filter.userId) {
      allRecords = allRecords.filter((p) => p.userId === filter.userId);
    }

    allRecords = allRecords.slice(filter.offset, filter.offset + filter.limit);
    return allRecords;
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

  async remove(id: string, userId: string): Promise<RequestDto | undefined> {
    const oldrequest = await this.getById(id);
    const index = this._array.indexOf(oldrequest);
    if (index === -1 || oldrequest.userId !== userId) {
      return Promise.resolve(null);
    }
    return Promise.resolve(this._array.splice(index, 1)[0]);
  }
}
