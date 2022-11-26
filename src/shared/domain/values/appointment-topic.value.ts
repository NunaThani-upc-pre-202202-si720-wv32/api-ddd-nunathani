import { Result } from 'typescript-result';
import { AppNotification } from '../../application/app.notification';

export class AppointmentTopic {
  private readonly topic: string;
  private static MAX_LENGTH: number = 20;

  private constructor(topic: string) {
    this.topic = topic;
  }

  public gettopic(): string {
    return this.topic;
  }

  public static create(topic: string): AppointmentTopic {
    topic = (topic ?? "").trim();
    return new AppointmentTopic(topic);
  }

  public static createResult(topic: string): Result<AppNotification, AppointmentTopic> {
    let notification: AppNotification = new AppNotification();
    topic = (topic ?? "").trim();
    if (topic === "") {
      notification.addError('topic is required', null);
    }
    if (topic.length > this.MAX_LENGTH) {
      notification.addError('The maximum length of an topic is ' + this.MAX_LENGTH + ' characters including spaces', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new AppointmentTopic(topic));
  }
}