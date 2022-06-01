import {
  AddRoleDto,
  BanUserDto,
  BaseUserDto,
  UserDto,
} from 'common/models/users/dto';

export interface IUserRepository {
  getAll(offset: number, limit: number): Promise<UserDto[]>;

  getById(id: string): Promise<UserDto | null | undefined>;

  getByEmail(email: string): Promise<UserDto | null | undefined>;

  create(dto: UserDto): Promise<UserDto>;

  update(id: string, dto: BaseUserDto): Promise<UserDto | null | undefined>;

  remove(id: string): Promise<UserDto | null | undefined>;

  addRole(id: string, addRoleDto: AddRoleDto);

  ban(id: string, banUserDto: BanUserDto);
}
