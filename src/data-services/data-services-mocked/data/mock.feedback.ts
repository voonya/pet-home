import { Feedback } from 'feedback/dto';
import { UserTypeEnum } from 'users/user-type.enum';
import { randomUUID } from 'crypto';

const user1 = '123e4567-e89b-12d3-a456-426614174000';
const user2 = 'c7146c3c-de38-432d-9edc-970e04f31fa3';
export const feedbackMock: Feedback[] = [
  {
    _id: randomUUID(),
    userId: user1,
    creatorId: user2,
    created_date: new Date(),
    userType: UserTypeEnum.Owner,
    title: 'My feedback1',
    body: 'Super owner! a lot of great feelings!',
    rate: 5,
  },
  {
    _id: randomUUID(),
    userId: user1,
    creatorId: randomUUID(),
    created_date: new Date(),
    userType: UserTypeEnum.Owner,
    title: 'My feedback2',
    body: 'Super owner! And his dog is nice!',
    rate: 10,
  },
  {
    _id: randomUUID(),
    userId: user1,
    creatorId: randomUUID(),
    created_date: new Date(),
    userType: UserTypeEnum.Owner,
    title: 'My feedback3',
    body: 'Super owner! really',
    rate: 7,
  },
  {
    _id: randomUUID(),
    userId: user1,
    creatorId: randomUUID(),
    created_date: new Date(),
    userType: UserTypeEnum.Handler,
    title: 'My feedback4',
    body: 'Super handler!',
    rate: 8,
  },
  {
    _id: randomUUID(),
    userId: user1,
    creatorId: randomUUID(),
    created_date: new Date(),
    userType: UserTypeEnum.Handler,
    title: 'My feedback5',
    body: 'Super handler! I love him!',
    rate: 10,
  },
];
