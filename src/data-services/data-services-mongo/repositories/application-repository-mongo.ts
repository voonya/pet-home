import { ApplicationQueryDto, ApplicationDto } from 'applications/dto';
import { IApplicationRepository } from 'data-services/interfaces/iapplication-repository';
import { Model } from 'mongoose';
import { ApplicationDocument } from 'data-services/data-services-mongo/schemas/applications.schema';

export class ApplicationRepositoryMongo implements IApplicationRepository {
  constructor(private _repository: Model<ApplicationDocument>) {}

  async getAll(filter: ApplicationQueryDto = {}): Promise<ApplicationDto[]> {
    const filteringObject = filter;
    delete filteringObject.limit;
    delete filteringObject.offset;

    return this._repository
      .find(filteringObject)
      .skip(filter.offset)
      .limit(filter.limit)
      .exec();
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
