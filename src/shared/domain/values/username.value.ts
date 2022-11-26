import { AppNotification } from '../../../shared/application/app.notification';
import { Result } from 'typescript-result';

export class Username {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public static create(name: string): Username {
    name = (name ?? '').trim();
    return new Username(name);
  }

  public static createResult(name: string): Result<AppNotification, Username> {
    let notification: AppNotification = new AppNotification();
    name = (name ?? '').trim();
    if (name === '') {
      notification.addError('username is required', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Username(name));
  }
}