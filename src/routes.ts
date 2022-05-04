import express from 'express';
import { NodemailerMailAdapater } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
export const routes = express.Router();

routes.use(express.json());

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const nodemailerMailAdapter = new NodemailerMailAdapater();
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository, nodemailerMailAdapter);

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot
  })

  return res.status(201).send();
})
