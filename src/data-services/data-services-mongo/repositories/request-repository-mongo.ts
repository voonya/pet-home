import { IRequestRepository } from 'data-services/interfaces/irequest-repository';
import { Model } from 'mongoose';
import { RequestDocument } from 'data-services/data-services-mongo/schemas/requests.schema';
import {
  RequestDto,
  RequestQueryDto,
  UpdateRequestDto,
} from 'common/models/requests/dto';
import { PopulatedRequestDto } from 'common/models/requests/dto/populated-request.dto';

export class RequestRepositoryMongo implements IRequestRepository {
  constructor(private _repository: Model<RequestDocument>) {}

  async getAll(filter: RequestQueryDto = {}): Promise<PopulatedRequestDto[]> {
    const offset = filter.offset;
    const limit = filter.limit;

    const res = await this._repository
      .find(filter)
      .skip(offset)
      .limit(limit)
      .populate('user')
      .populate('animal')
      .exec();

    console.log(res);

    return res;
  }

  async getById(id: string): Promise<PopulatedRequestDto> {
    return this._repository.findById(id).exec();
  }

  async create(dto: RequestDto): Promise<PopulatedRequestDto> {
    return this._repository.create(dto);
  }

  async update(
    id: string,
    dto: UpdateRequestDto,
  ): Promise<PopulatedRequestDto> {
    return this._repository
      .findOneAndUpdate({ _id: id }, dto, { new: true })
      .exec();
  }

  async remove(id: string, userId: string): Promise<PopulatedRequestDto> {
    return this._repository
      .findOneAndRemove({ _id: id, userId: userId })
      .exec();
  }

  async resign(id: string) {
    return this._repository.findOneAndUpdate(
      { _id: id },
      { $unset: { assignedApplicationId: 1 } },
    );
  }
}
