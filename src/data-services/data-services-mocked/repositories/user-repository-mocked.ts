import { IUserRepository } from 'data-services/interfaces/iuser-repository';
import { AddRoleDto, BanUserDto, BaseUserDto, UserDto } from 'users/dto';

export class UserRepositoryMocked implements IUserRepository {
  constructor(arrayMock: UserDto[]) {
    this._array = arrayMock;
  }

  private readonly _array: UserDto[];

  create(dto: UserDto): Promise<UserDto> {
    this._array.push(dto);
    return Promise.resolve(dto);
  }

  getAll(offset: number, limit: number): Promise<UserDto[]> {
    return Promise.resolve(this._array.slice(offset, offset + limit));
  }

  getByEmail(email: string): Promise<UserDto | null | undefined> {
    return Promise.resolve(this._array.find((user) => user.email === email));
  }

  getById(id: string): Promise<UserDto | null | undefined> {
    return Promise.resolve(this._array.find((user) => user.id === id));
  }

  async update(
    id: string,
    dto: BaseUserDto,
  ): Promise<UserDto | null | undefined> {
    const oldUser = await this.getById(id);
    if (!oldUser) {
      return Promise.resolve(null);
    }
    const index = this._array.indexOf(oldUser);
    const newUser = { ...oldUser, ...dto };
    this._array[index] = newUser;
    return Promise.resolve(newUser);
  }

  async remove(id: string): Promise<UserDto | null | undefined> {
    const oldUser = await this.getById(id);
    if (!oldUser) {
      return Promise.resolve(null);
    }
    const index = this._array.indexOf(oldUser);
    return Promise.resolve(this._array.splice(index, 1)[0]);
  }

  async addRole(
    id: string,
    addRoleDto: AddRoleDto,
  ): Promise<UserDto | null | undefined> {
    const user = await this.getById(id);
    if (!user) {
      return Promise.resolve(null);
    }
    if (user.roles.indexOf(addRoleDto.role) === -1) {
      user.roles.push(addRoleDto.role);
    }
    return Promise.resolve(user);
  }

  async ban(
    id: string,
    banUserDto: BanUserDto,
  ): Promise<UserDto | null | undefined> {
    const user = await this.getById(id);
    if (!user) {
      return Promise.resolve(null);
    }
    user.banned = true;
    user.banReason = banUserDto.banReason;
    return user;
  }
}
