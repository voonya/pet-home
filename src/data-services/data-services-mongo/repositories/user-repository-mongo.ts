import { Model } from 'mongoose';
import { IUserRepository } from 'data-services/interfaces/iuser-repository';
import { UserDocument } from 'data-services/data-services-mongo/schemas/user.schema';
import {
  AddRoleDto,
  BanUserDto,
  BaseUserDto,
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

  update(id: string, dto: BaseUserDto): Promise<UserDto | null | undefined> {
    return this._repository.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async addRole(id: string, addRoleDto: AddRoleDto) {
    const user = await this.getById(id);
    if (!user) {
      return Promise.resolve(null);
    }
    if (user.roles.indexOf(addRoleDto.role) === -1) {
      return this._repository.findByIdAndUpdate(
        id,
        { $push: { roles: addRoleDto.role } },
        { new: true },
      );
    }
    return Promise.resolve(user);
  }

  ban(id: string, banUserDto: BanUserDto) {
    return this._repository
      .findByIdAndUpdate(id, { banned: true, ...banUserDto }, { new: true })
      .exec();
  }
}
