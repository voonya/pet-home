import { randomUUID } from 'crypto';
import { IRequestRepository } from 'data-services/interfaces/irequest-repository';
import { RequestDto, RequestQueryDto } from 'requests/dto';

export class RequestRepositoryMocked implements IRequestRepository {
  constructor(private _array: RequestDto[]) {}

  async getAll(filter: RequestQueryDto = {}): Promise<RequestDto[]> {
    let allRecords = this._array;

    if (filter.id) {
      allRecords = allRecords.filter((p) => p._id === filter.id);
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
    return Promise.resolve(this._array.find((p) => p._id === id));
  }

  async create(dto: RequestDto): Promise<RequestDto> {
    const newDto = { ...dto, _id: randomUUID().toString() };
    this._array.push(newDto);
    return Promise.resolve(newDto);
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
