import { RoleEnum } from 'common/models/users/role.enum';
import { UserDto } from 'common/models/users/dto/user.dto';

export class ResponseUserDto {
  constructor(user: UserDto) {
    this._id = user._id;
    this.creationDate = user.creationDate;
    this.banned = user.banned;
    this.banReason = user.banReason;
    this.roles = user.roles;
    this.name = user.name;
    this.surname = user.surname;
    this.email = user.email;
    this.birthDate = user.birthDate;
    this.sex = user.sex;
  }

  _id?: string;

  creationDate: Date;

  banned: boolean;

  banReason?: string;

  roles: RoleEnum[];

  name: string;

  surname: string;

  email: string;

  birthDate?: Date;

  sex?: string;
}
