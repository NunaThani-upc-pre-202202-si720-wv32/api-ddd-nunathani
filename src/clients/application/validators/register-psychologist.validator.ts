import { Inject, Injectable } from '@nestjs/common';
import { Psychologist } from 'src/clients/domain/aggregates/client/psychologist.entity';
import { PsychologistRepository, PSYCHOLOGIST_REPOSITORY } from 'src/clients/domain/aggregates/client/psychologist.repository';
import { AppNotification } from 'src/shared/application/app.notification';
import { RegisterPsychologist } from '../messages/commands/register-psychologist.command';

@Injectable()
export class RegisterPsychologistValidator {
  constructor(
    @Inject(PSYCHOLOGIST_REPOSITORY)
    private psychologistRepository: PsychologistRepository,
  ) {
  }

  public async validate(registerPsychologist: RegisterPsychologist): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const name: string = registerPsychologist.name;
    //    const name: string = registerPsychologist.name.trim();

    if (name.length <= 0) {
      notification.addError('name is required', null);
    }
    // const ruc: string = registerPsychologist.ruc.trim();
    // if (ruc.length <= 0) {
    //   notification.addError('ruc is required', null);
    // }
    if (notification.hasErrors()) {
      return notification;
    }
    let psychologist: Psychologist = await this.psychologistRepository.getByName(name);
    if (psychologist != null) {
      notification.addError('name is taken', null);
      return notification;
    }
    // psychologist = await this.psychologistRepository.getByRuc(ruc);
    // if (psychologist != null) {
    //   notification.addError('ruc is taken', null);
    // }
    return notification;
  }
}