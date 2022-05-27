import { Feedback } from 'feedback/dto';
import { UserTypeEnum } from 'users/user-type.enum';

export const feedbackMock: Feedback[] = [
  {
    _id: '0',
    userId: '1',
    creatorId: '2',
    created_date: new Date(),
    userType: UserTypeEnum.Owner,
    title: 'My feedback1',
    body: 'Super owner! a lot of great feelings!',
    rate: 5,
  },
  {
    _id: '1',
    userId: '1',
    creatorId: '2',
    created_date: new Date(),
    userType: UserTypeEnum.Owner,
    title: 'My feedback2',
    body: 'Super owner! And his dog is nice!',
    rate: 10,
  },
  {
    _id: '2',
    userId: '1',
    creatorId: '2',
    created_date: new Date(),
    userType: UserTypeEnum.Owner,
    title: 'My feedback3',
    body: 'Super owner! really',
    rate: 7,
  },
  {
    _id: '3',
    userId: '1',
    creatorId: '2',
    created_date: new Date(),
    userType: UserTypeEnum.Handler,
    title: 'My feedback4',
    body: 'Super handler!',
    rate: 8,
  },
  {
    _id: '4',
    userId: '1',
    creatorId: '2',
    created_date: new Date(),
    userType: UserTypeEnum.Handler,
    title: 'My feedback5',
    body: 'Super handler! I love him!',
    rate: 10,
  },
];
