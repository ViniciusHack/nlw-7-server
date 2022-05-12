import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbacksRepository } from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({ userId, type, comment, screenshot }: FeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
        user_id: userId
      }
    })
  }

  async list(uid: string) {
    const feedbacks = await prisma.feedback.findMany({
      where: {
        user_id: uid
      }
    })


    // if(feedbacks.length === 0) {
    //   throw new Error("There aren't feedbacks for this user yet");
    // }
    
    return feedbacks;
  }
}