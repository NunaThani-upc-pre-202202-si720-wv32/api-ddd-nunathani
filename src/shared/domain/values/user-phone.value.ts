import { AppNotification } from '../../../shared/application/app.notification';
import { Result } from 'typescript-result';

export class UserPhone {
  private value: string;
  private static MAX_LENGTH: number = 9;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(phone: string): UserPhone {
    phone = (phone ?? '').trim();
    return new UserPhone(phone);
  }

  public static createResult(phone: string): Result<AppNotification, UserPhone> {
    let notification: AppNotification = new AppNotification();
    phone = (phone ?? '').trim();
    if (phone === '') {
      notification.addError('user phone is required', null);
    }
    if (phone.length != this.MAX_LENGTH) {
      notification.addError(
        'user phone field must have ' + UserPhone.MAX_LENGTH + ' characters',
        null,
      );
    }
    const regExp = new RegExp('^[0-9]+$');
    if (regExp.test(phone) === false) {
      notification.addError('user phone format is invalid', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new UserPhone(phone));
  }

  public getValue(): string {
    return this.value;
  }
}
