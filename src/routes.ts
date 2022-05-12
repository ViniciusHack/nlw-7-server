import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { PrismaUsersRepository } from './repositories/prisma/prisma-users-repository';
import { CreateUserUseCase } from './use-cases/create-user-use-case';
import { ListFeedbacksUseCase } from './use-cases/list-feedbacks-use-case';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
export const routes = express.Router();

routes.use(express.json());

const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
const prismaUsersRepository = new PrismaUsersRepository();

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot, email } = req.body;

  const nodemailerMailAdapter = new NodemailerMailAdapter();
  
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository, prismaUsersRepository, nodemailerMailAdapter,);
  
  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
    email
  })

  return res.status(201).send();
})

routes.get("/feedbacks/:uid", async (req, res) => {
  const { uid } = req.params;
  const listFeedbackUseCase = new ListFeedbacksUseCase(prismaFeedbacksRepository);

  const feedbacks = await listFeedbackUseCase.execute(uid);

  return res.status(200).json(feedbacks)
})

routes.post("/users", async (req, res) => {
  const { name, imageURL, email, uid } = req.body;

  const createUserUseCase = new CreateUserUseCase(prismaUsersRepository);
  
  const result = await createUserUseCase.execute({ name, imageURL, email, uid });

  return res.status(200).json(result)
})