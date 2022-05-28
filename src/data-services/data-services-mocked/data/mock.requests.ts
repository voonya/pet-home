import { RequestDto } from 'requests/dto';

export const requests: RequestDto[] = [
  {
    _id: '1',
    userId: '1',
    animalId: '11',
    details: 'dsjf jkdsfsdjkhf dskjhfbdskjfh',
    adress: 'kdjslf dsjf df',
    creationDate: new Date(),
    expirationDate: new Date('2022-06-20'),
  },
  {
    _id: '2',
    userId: '13',
    animalId: '221',
    details: 'dsjf jkdsfsdsdjkhf dskjhfbdskjfh',
    adress: 'kdjslf dsasjf df',
    creationDate: new Date(),
    expirationDate: new Date('2022-06-21'),
  },
  {
    _id: '3',
    userId: '121',
    animalId: '13',
    details: 'dsjf jkdsfsdjkhf dskdsjhfbdskjfh',
    adress: 'kdjslf dsjasf df',
    creationDate: new Date(),
    expirationDate: new Date('2022-06-14'),
  },
];
