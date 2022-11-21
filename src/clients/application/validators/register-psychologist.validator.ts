import { Inject, Injectable } from '@nestjs/common';
import { Psychologist } from 'src/clients/domain/aggregates/client/psychologist.entity';
import { PsychologistRepository, PSYCHOLOGIST_REPOSITORY } from 'src/clients/domain/aggregates/client/psychologist.repository';
import { AppNotification } from 'src/shared/application/app.notification';
import { RegisterPsychologist } from '../messages/commands/register-psychologist.command';

@Injectable()
export class RegisterPsychologistValidator {
  constructor(
    @Inject(PSYCHOLOGIST_REPOSITORY)
    private csychologistRepository: PsychologistRepository,
  ) {
  }

  public async validate(registerPsychologist: RegisterPsychologist): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const name: string = registerPsychologist.name.trim();
    if (name.length <= 0) {
      notification.addError('name is required', null);
    }
    
    if (notification.hasErrors()) {
      return notification;
    }
    let csychologist: Psychologist = await this.csychologistRepository.getByName(name);
    if (csychologist != null) {
      notification.addError('name is taken', null);
      return notification;
    }
    return notification;
  }
}