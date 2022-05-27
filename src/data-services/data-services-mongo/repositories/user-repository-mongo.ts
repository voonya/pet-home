import { Model } from 'mongoose';
import { IUserRepository } from 'data-services/interfaces/iuser-repository';
import { UserDocument } from 'data-services/data-services-mongo/schemas/user.schema';
import { BaseUserDto, UserDto } from 'users/dto';

export class UserRepositoryMongo implements IUserRepository {
  private _repository: Model<UserDocument>;

  constructor(repository: Model<UserDocument>) {
    this._repository = repository;
  }

  async create(dto: UserDto): Promise<UserDto> {
    return this._repository.create(dto);
  }

  getAll(offset: number, limit: number): Promise<UserDto[]> {
    return this._repository.find({}, {}, { offset, limit }).exec();
  }

  getByEmail(email: string): Promise<UserDto | null | undefined> {
    return this._repository.findOne({ email }).exec();
  }

  getById(id: string): Promise<UserDto | null | undefined> {
    return this._repository.findById({ _id: id }).exec();
  }

  remove(id: string): Promise<UserDto | null | undefined> {
    return this._repository.findByIdAndRemove({ _id: id }).exec();
  }

  update(id: string, dto: BaseUserDto): Promise<UserDto | null | undefined> {
    return this._repository
      .findByIdAndUpdate({ _id: id }, dto, { new: true })
      .exec();
  }
}
