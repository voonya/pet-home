import { ApplicationDto } from 'applications/dto';
import { IApplicationRepository } from 'data-services/interfaces/iapplication-repository';

export class ApplicationRepositoryMocked implements IApplicationRepository {
  constructor(private _array: ApplicationDto[]) {}

  async getAll(): Promise<ApplicationDto[]> {
    return Promise.resolve(this._array);
  }

  async getById(id: string): Promise<ApplicationDto> {
    return Promise.resolve(this._array.find((p) => p.id === id));
  }

  async create(dto: ApplicationDto): Promise<ApplicationDto> {
    this._array.push(dto);
    return Promise.resolve(dto);
  }

  async update(
    id: string,
    userId: string,
    dto: ApplicationDto,
  ): Promise<ApplicationDto | undefined> {
    const oldApplication = await this.getById(id);
    if (!this.doesUserOwns(oldApplication, userId)) {
      return Promise.resolve(undefined);
    }

    const index = this._array.indexOf(oldApplication);
    this._array[index] = dto;
    return Promise.resolve(dto);
  }

  async remove(
    id: string,
    userId: string,
  ): Promise<ApplicationDto | undefined> {
    const oldApplication = await this.getById(id);
    if (!this.doesUserOwns(oldApplication, userId)) {
      return Promise.resolve(undefined);
    }

    const index = this._array.indexOf(oldApplication);
    return Promise.resolve(this._array.splice(index, 1)[0]);
  }

  private doesUserOwns(
    application: ApplicationDto | undefined,
    userId: string,
  ) {
    return application ? application.userId === userId : false;
  }
}
