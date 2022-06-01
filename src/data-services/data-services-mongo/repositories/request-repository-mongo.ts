import { IRequestRepository } from 'data-services/interfaces/irequest-repository';
import { Model } from 'mongoose';
import { RequestDocument } from 'data-services/data-services-mongo/schemas/requests.schema';
import {
  RequestDto,
  RequestQueryDto,
  UpdateRequestDto,
} from 'common/models/requests/dto';

export class RequestRepositoryMongo implements IRequestRepository {
  constructor(private _repository: Model<RequestDocument>) {}

  async getAll(filter: RequestQueryDto = {}): Promise<RequestDto[]> {
    const offset = filter.offset;
    const limit = filter.limit;
    delete filter.limit;
    delete filter.offset;

    return this._repository.find(filter).skip(offset).limit(limit).exec();
  }

  async getById(id: string): Promise<RequestDto> {
    return this._repository.findById(id).exec();
  }

  async create(dto: RequestDto): Promise<RequestDto> {
    return this._repository.create(dto);
  }

  async update(id: string, dto: UpdateRequestDto): Promise<RequestDto> {
    return this._repository
      .findOneAndUpdate({ _id: id }, dto, { new: true })
      .exec();
  }

  async remove(id: string, userId: string): Promise<RequestDto> {
    return this._repository
      .findOneAndRemove({ _id: id, userId: userId })
      .exec();
  }
}
