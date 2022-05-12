import { FeedbacksRepository } from "../../repositories/feedbacks-repository";


export class ListFeedbacksUseCase {
  constructor(
    private feedbackRepository: FeedbacksRepository
  ){}


  async execute(uid: string) {
    const result = await this.feedbackRepository.list(uid);

    return result;
  }
}