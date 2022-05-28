import { IRequestRepository } from 'data-services/interfaces/irequest-repository';
import { Model } from 'mongoose';
import { RequestDocument } from 'data-services/data-services-mongo/schemas/requests.schema';
import { RequestDto, RequestQueryDto } from 'requests/dto';

export class RequestRepositoryMongo implements IRequestRepository {
  constructor(private _repository: Model<RequestDocument>) {}

  async getAll(filter: RequestQueryDto = {}): Promise<RequestDto[]> {
    const filteringObject = filter;
    delete filteringObject.limit;
    delete filteringObject.offset;

    return this._repository
      .find(filteringObject)
      .skip(filter.offset)
      .limit(filter.limit)
      .exec();
  }

  getById(id: string): Promise<RequestDto> {
    return this._repository.findById({ _id: id }).exec();
  }

  create(dto: RequestDto): Promise<RequestDto> {
    return this._repository.create(dto);
  }

  update(id: string, dto: RequestDto): Promise<RequestDto> {
    return this._repository
      .findByIdAndUpdate({ _id: id }, dto, { new: true })
      .exec();
  }

  remove(id: string): Promise<RequestDto> {
    return this._repository.findByIdAndRemove({ _id: id }).exec();
  }
}
