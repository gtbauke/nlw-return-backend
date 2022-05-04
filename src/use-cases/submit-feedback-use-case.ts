import { MailAdapter } from '../adapters/mail-adapter';
import { FeedbacksRepository } from '../repositories/feedbacks-repository';

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  public constructor(
    private readonly feedbacksRepository: FeedbacksRepository,
    private readonly mailAdapter: MailAdapter,
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error('Type is required');
    }

    if (!comment) {
      throw new Error('Comment is required');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Screenshot must be a base64 encoded PNG');
    }

    await this.feedbacksRepository.create({ type, comment, screenshot });
    await this.mailAdapter.sendMail({ 
      subject: 'Novo Feedback', 
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `</div>`,
      ].join('\n'),
    });
  }
}
