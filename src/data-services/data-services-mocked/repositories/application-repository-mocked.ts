import { ApplicationDto, ApplicationQueryDto } from 'applications/dto';
import { randomUUID } from 'crypto';
import { IApplicationRepository } from 'data-services/interfaces/iapplication-repository';

export class ApplicationRepositoryMocked implements IApplicationRepository {
  constructor(private _array: ApplicationDto[]) {}

  async getAll(filter: ApplicationQueryDto = {}): Promise<ApplicationDto[]> {
    let allRecords = this._array;

    if (filter.id) {
      allRecords = allRecords.filter((p) => p._id === filter.id);
    }
    if (filter.requestId) {
      allRecords = allRecords.filter((p) => p.requestId === filter.requestId);
    }
    if (filter.userId) {
      allRecords = allRecords.filter((p) => p.userId === filter.userId);
    }

    allRecords = allRecords.slice(filter.offset, filter.offset + filter.limit);
    return Promise.resolve(allRecords);
  }

  async getById(id: string): Promise<ApplicationDto> {
    return Promise.resolve(this._array.find((p) => p._id === id));
  }

  async create(dto: ApplicationDto): Promise<ApplicationDto> {
    this._array.push({ ...dto, _id: randomUUID().toString() });
    return Promise.resolve(dto);
  }

  async update(
    id: string,
    dto: ApplicationDto,
  ): Promise<ApplicationDto | undefined> {
    const oldApplication = await this.getById(id);
    const index = this._array.indexOf(oldApplication);
    this._array[index] = dto;
    return Promise.resolve(dto);
  }

  async remove(id: string): Promise<ApplicationDto | undefined> {
    const oldApplication = await this.getById(id);
    const index = this._array.indexOf(oldApplication);
    return Promise.resolve(this._array.splice(index, 1)[0]);
  }
}
