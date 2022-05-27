import { UserDto } from 'users/dto';

export interface IUserRepository {
  getAll(offset: number, limit: number): Promise<UserDto[]>;

  getById(id: string): Promise<UserDto | null | undefined>;

  getByEmail(email: string): Promise<UserDto | null | undefined>;

  create(dto: UserDto): Promise<UserDto>;

  update(id: string, dto: UserDto): Promise<UserDto | null | undefined>;

  remove(id: string): Promise<UserDto | null | undefined>;
}
