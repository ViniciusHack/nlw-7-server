import { Feedback } from "@prisma/client";

export interface FeedbackCreateData { //DTO
  type: string;
  comment: string;
  screenshot?: string;
  userId: string;
}

export interface FeedbacksRepository {
  create: (data: FeedbackCreateData) => Promise<void>;
  list: (uid: string) => Promise<Feedback[]>;
}