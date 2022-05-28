import { ApplicationQueryDto, ApplicationDto } from 'applications/dto';
import { IApplicationRepository } from 'data-services/interfaces/iapplication-repository';
import { Model } from 'mongoose';
import { ApplicationDocument } from 'data-services/data-services-mongo/schemas/applications.schema';

export class ApplicationRepositoryMongo implements IApplicationRepository {
  constructor(private _repository: Model<ApplicationDocument>) {}

  async getAll(filter: ApplicationQueryDto = {}): Promise<ApplicationDto[]> {
    const offset = filter.offset;
    const limit = filter.limit;
    delete filter.limit;
    delete filter.offset;

    return this._repository.find(filter).skip(offset).limit(limit).exec();
  }

  async getById(id: string): Promise<ApplicationDto> {
    return this._repository.findById(id).exec();
  }

  async create(dto: ApplicationDto): Promise<ApplicationDto> {
    return this._repository.create(dto);
  }

  async update(id: string, dto: ApplicationDto): Promise<ApplicationDto> {
    return this._repository
      .findByIdAndUpdate({ _id: id }, dto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<ApplicationDto> {
    return this._repository.findByIdAndRemove({ _id: id }).exec();
  }
}
