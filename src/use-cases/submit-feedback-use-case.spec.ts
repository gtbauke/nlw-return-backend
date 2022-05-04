import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

describe('Submit Feedback', () => {
  const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy },
  );

  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Teste de feedback',
      screenshot: 'data:image/png;base64,ouewhfiuewghfoihwe',
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should be able to submit a feedback without a type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'Teste de feedback',
      screenshot: 'data:image/png;base64,ouewhfiuewghfoihwe',
    })).rejects.toThrow();
  });

  it('should be able to submit a feedback without a comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,ouewhfiuewghfoihwe',
    })).rejects.toThrow();
  });

  it('should be able to submit a feedback without an invalid encoded screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Teste de feedback',
      screenshot: 'test.png',
    })).rejects.toThrow();
  });
});
