// import { ListFeedbacksUseCase } from "./list-feedbacks-use-case";
// import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

// const listFeedbackSpy = jest.fn();

// const createFeedbackSpy = jest.fn();

// const sendMailSpy = jest.fn();


// const listFeedback = new ListFeedbacksUseCase({
//   create: createFeedbackSpy, list: listFeedbackSpy
// })

// const submitFeedback = new SubmitFeedbackUseCase( 
//   { create: createFeedbackSpy, list: listFeedbackSpy },
//   { sendMail: sendMailSpy },
// );

// describe("List feedbacks", () => {
//   beforeAll(async () => {
//     await submitFeedback.execute({
//       type: "BUG",
//       comment: "example comment"
//     })
//   })

//   it("should be able to list all feedbacks", async () => {
//     const result = await listFeedback.execute();
//     console.log(result);
//     expect(listFeedback).toHaveBeenCalled();
//   })
// })