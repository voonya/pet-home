import { UserDto } from 'users/dto/user.dto';
import { RoleEnum } from 'users/role.enum';

export const users: UserDto[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Max',
    surname: 'Petrenko',
    email: 'MyEmail@gmail.com',
    birthDate: new Date('2001-10-5'),
    sex: 'Man',
    creationDate: new Date('2022-10-5'),
    banned: false,
    roles: [RoleEnum.User],
  },
  {
    id: '0bdc5c68-da0d-11ec-9d64-0242ac120002',
    name: 'Bill',
    surname: 'Johnson',
    email: 'MyEmail2@gmail.com',
    birthDate: new Date('2001-10-5'),
    sex: 'Man',
    creationDate: new Date('2022-10-5'),
    banned: false,
    roles: [RoleEnum.User],
  },
  {
    id: '122fe7b0-da0d-11ec-9d64-0242ac120002',
    name: 'John',
    surname: 'Billy',
    email: 'MyEmail3@gmail.com',
    birthDate: new Date('2001-10-5'),
    sex: 'Man',
    creationDate: new Date('2022-10-5'),
    banned: false,
    roles: [RoleEnum.User],
  },
  {
    id: '122fe904-da0d-11ec-9d64-0242ac120002',
    name: 'Den',
    surname: 'Ostapenko',
    email: 'MyEmail4@gmail.com',
    birthDate: new Date('2001-10-5'),
    sex: 'Man',
    creationDate: new Date('2022-10-5'),
    banned: false,
    roles: [RoleEnum.User],
  },
];
