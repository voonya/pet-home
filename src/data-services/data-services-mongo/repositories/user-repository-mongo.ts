import { Model } from 'mongoose';
import { IUserRepository } from 'data-services/interfaces/iuser-repository';
import { UserDocument } from 'data-services/data-services-mongo/schemas/user.schema';
import {
  AddRoleDto,
  BanUserDto,
  UpdateUserDto,
  UserDto,
} from 'common/models/users/dto';

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
    return this._repository.findById(id).exec();
  }

  remove(id: string): Promise<UserDto | null | undefined> {
    return this._repository.findByIdAndRemove(id).exec();
  }

  update(id: string, dto: UpdateUserDto): Promise<UserDto | null | undefined> {
    return this._repository.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async updatePassword(
    id: string,
    password: string,
  ): Promise<UserDto | null | undefined> {
    return this._repository
      .findByIdAndUpdate(id, { password: password }, { new: true })
      .exec();
  }

  async addRole(
    id: string,
    addRoleDto: AddRoleDto,
  ): Promise<UserDto | null | undefined> {
    return this._repository.findByIdAndUpdate(
      id,
      { $addToSet: { roles: addRoleDto.role } },
      { new: true },
    );
  }

  ban(id: string, banUserDto: BanUserDto): Promise<UserDto | null | undefined> {
    return this._repository
      .findByIdAndUpdate(id, { banned: true, ...banUserDto }, { new: true })
      .exec();
  }
}
