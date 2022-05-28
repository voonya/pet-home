import { Feedback } from 'feedback/dto';
import { UserTypeEnum } from 'users/user-type.enum';
import { randomUUID } from 'crypto';

const users = [
  '122fe7b0-da0d-11ec-9d64-0242ac120002',
  '0bdc5c68-da0d-11ec-9d64-0242ac120002',
  '122fe904-da0d-11ec-9d64-0242ac120002',
];
export const feedbackMock: Feedback[] = [
  {
    _id: randomUUID(),
    userId: users[0],
    creatorId: users[1],
    created_date: new Date(),
    userType: UserTypeEnum.Owner,
    title: 'My feedback1',
    body: 'Super owner! a lot of great feelings!',
    rate: 5,
  },
  {
    _id: randomUUID(),
    userId: users[0],
    creatorId: users[1],
    created_date: new Date(),
    userType: UserTypeEnum.Owner,
    title: 'My feedback2',
    body: 'Super owner! And his dog is nice!',
    rate: 10,
  },
  {
    _id: randomUUID(),
    userId: users[0],
    creatorId: users[1],
    created_date: new Date(),
    userType: UserTypeEnum.Owner,
    title: 'My feedback3',
    body: 'Super owner! really',
    rate: 7,
  },
  {
    _id: randomUUID(),
    userId: users[0],
    creatorId: users[2],
    created_date: new Date(),
    userType: UserTypeEnum.Handler,
    title: 'My feedback4',
    body: 'Super handler!',
    rate: 8,
  },
  {
    _id: randomUUID(),
    userId: users[0],
    creatorId: users[2],
    created_date: new Date(),
    userType: UserTypeEnum.Handler,
    title: 'My feedback5',
    body: 'Super handler! I love him!',
    rate: 10,
  },
];
