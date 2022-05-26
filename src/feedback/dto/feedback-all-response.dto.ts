import { Feedback } from 'feedback/dto';

export interface FeedbackAllResponseDto {
  rate: number;
  feedbacks: Feedback[];
}
