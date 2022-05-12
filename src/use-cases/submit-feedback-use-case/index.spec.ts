import { SubmitFeedbackUseCase } from ".";

const createFeedbackSpy = jest.fn();
const listFeedbackSpy = jest.fn();

const createUserSpy = jest.fn();
const findByEmailSpy = jest.fn();


const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase( 
  { create: createFeedbackSpy, list: listFeedbackSpy },
  { create: createUserSpy, findByEmail: findByEmailSpy},
  { sendMail: sendMailSpy },
);

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: "BUG",
      comment: "example comment",
      email: "teste@teste.com"
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: "",
      comment: "example comment",
      email: "teste@teste.com"
    })).rejects.toThrow();
  });

  it('should not be able to submit a feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: "BUG",
      comment: "",
      email: "teste@teste.com"
    })).rejects.toThrow();
  });

  it('should not be able to submit a feedback with an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: "BUG",
      comment: "Ta tudo bugado",
      screenshot: "test.jpg",
      email: "teste@teste.com"
    })).rejects.toThrow();
  });
});