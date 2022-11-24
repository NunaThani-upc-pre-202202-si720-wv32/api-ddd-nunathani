import { Inject, Injectable } from '@nestjs/common';
import { AppNotification } from 'src/shared/application/app.notification';
import { RegisterPerson } from '../messages/commands/register-patient.command';
import { PersonRepository, PERSON_REPOSITORY } from 'src/clients/domain/aggregates/client/patient.repository';
import { Patient } from 'src/clients/domain/aggregates/client/patient.entity';

@Injectable()
export class RegisterPersonValidator {
  constructor(
    @Inject(PERSON_REPOSITORY)
    private personRepository: PersonRepository,
  ) {
  }

  public async validate(registerPerson: RegisterPerson,): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const firstName: string = registerPerson.firstName ? registerPerson.firstName.trim() : '';
    if (firstName.length <= 0) {
      notification.addError('firstName is required', null);
    }
    const lastName: string = registerPerson.lastName ? registerPerson.lastName.trim() : '';
    if (lastName.length <= 0) {
      notification.addError('lastName is required', null);
    }
    const dni: string = registerPerson.dni ? registerPerson.dni.trim() : '';
    if (dni.length <= 0) {
      notification.addError('dni is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const patient: Patient = await this.personRepository.getByDni(dni);
    if (patient != null) notification.addError('dni is taken', null);
    
    return notification;
  }
}