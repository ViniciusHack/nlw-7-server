import { MailAdapter } from "../../adapters/mail-adapter";
import { FeedbacksRepository } from "../../repositories/feedbacks-repository";
import { UsersRepository } from "../../repositories/users-repository";

interface SubmitFeedbackUseCaseRequest { // IRequest
  type: string;
  comment: string;
  email: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbackRepository: FeedbacksRepository,
    private userRepository: UsersRepository,
    private mailAdapter: MailAdapter,
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot, email } = request;

    if(!type) {
      throw new Error('Type is required.');
    }

    if(!comment) {
      throw new Error('Comment is required.');
    }


    try {
      const userExists = await this.userRepository.findByEmail(email);

      if(!userExists) throw new Error("Usuário não existe!");

      await this.feedbackRepository.create({
        type,
        comment,
        screenshot,
        userId: userExists.uid
      })
  
    } catch(err) {
      console.error(err);
    }

    if(screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error('Invalid screenshot format.');
    }

    await this.mailAdapter.sendMail({
      subject: `Novo Feedback [${type}]`,
      body: [
        // `<div style="font-family: sans-serif; font-size: 16px; color: #111; width: 100%; margin: 0 auto; max-width: 600px; text-align: center">`, 
        `<div style="background: #18181b; font-family: sans-serif; height: 100%;">`, 
          `<div>`,
            `<h1 style="margin: 0; padding: 3rem 0; text-align: center; color: #996DFF; font-size: 30px;">Tipo do feedback: <span style="color: #FFFFFF">${type}</span></h1>`,
            `<div style="width: 80%; margin: 0 auto;">`,
              `<hr style="width: 100%; border: 0; margin: 0 auto; height: 1px; background: #D4D4D8"/>`, 
              `<p style="margin: 0; padding: 3rem 0; color: #f4f4f5; font-size: 20px">Comentário: <b>${comment}</b></p>`,  
              screenshot && `<img style="width: 100%;" src="${screenshot}"/>`,
            `</div>`,
          `</div>`,
        `</div>`].join('\n')
    })
  }
}