import { AnimalDto } from '@animals/dto/animal.dto';
import { AnimalType } from '@animals/animal-type';

export const animals: AnimalDto[] = [
  {
    id: '039c2db2-da21-11ec-9d64-0242ac120002',
    name: 'Bayraktar',
    ownerId: '123e4567-e89b-12d3-a456-426614174000',
    type: AnimalType.Dog,
    breed: 'Husky',
    description: 'The best dog',
    creationDate: new Date('2022-10-5'),
    age: 2,
  },
  {
    id: '039c3118-da21-11ec-9d64-0242ac120002',
    name: 'Bayraktar',
    ownerId: '0bdc5c68-da0d-11ec-9d64-0242ac120002',
    type: AnimalType.Cat,
    breed: 'Husky',
    description: 'The best cat',
    creationDate: new Date('2022-10-5'),
    age: 3,
  },
  {
    id: '039c3226-da21-11ec-9d64-0242ac120002',
    name: 'Pirate',
    ownerId: '122fe7b0-da0d-11ec-9d64-0242ac120002',
    type: AnimalType.Parrot,
    breed: 'Husky',
    description: 'The best pet',
    creationDate: new Date('2022-10-5'),
    age: 5,
  },
  {
    id: '039c3320-da21-11ec-9d64-0242ac120002',
    name: 'Bobik',
    ownerId: '122fe904-da0d-11ec-9d64-0242ac120002',
    type: AnimalType.Dog,
    breed: 'SImple',
    description: 'The best dog',
    creationDate: new Date('2022-10-5'),
    age: 10,
  },
];
