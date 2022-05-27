import { IUserRepository } from 'data-services/interfaces/iuser-repository';
import { BaseUserDto, UserDto } from 'users/dto';

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
    return Promise.resolve(this._array.find((user) => user._id === id));
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
}
