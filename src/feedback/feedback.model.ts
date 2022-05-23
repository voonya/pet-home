export interface Feedback {
  id: string;
  userId: string;
  creatorId: string;
  userType: string;
  title: string;
  body: string;
  rate: number;
  created_date: Date;
}
