import { Inject, Injectable } from '@nestjs/common';
import { AppNotification } from 'src/shared/application/app.notification';
import { RegisterPatient } from '../messages/commands/register-patient.command';
import { PatientRepository, PERSON_REPOSITORY } from 'src/account/domain/aggregates/client/patient.repository';
import { Patient } from 'src/account/domain/aggregates/client/patient.entity';

@Injectable()
export class RegisterPatientValidator {
  constructor(
    @Inject(PERSON_REPOSITORY)
    private patientRepository: PatientRepository,
  ) {
  }

  public async validate(registerPatient: RegisterPatient,): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const firstName: string = registerPatient.firstName ? registerPatient.firstName.trim() : '';
    if (firstName.length <= 0) {
      notification.addError('firstName is required', null);
    }
    const lastName: string = registerPatient.lastName ? registerPatient.lastName.trim() : '';
    if (lastName.length <= 0) {
      notification.addError('lastName is required', null);
    }
    const dni: string = registerPatient.dni ? registerPatient.dni.trim() : '';
    if (dni.length <= 0) {
      notification.addError('dni is required', null);
    }
    const email: string = registerPatient.email ? registerPatient.email.trim() : '';
    if (email.length <= 0) {
      notification.addError('email is required', null);
    }

    const userPhone: string = registerPatient.userPhone ? registerPatient.userPhone.trim() : '';
    if (userPhone.length <= 0) {
      notification.addError('userPhone is required', null);
    }

    const username: string = registerPatient.username ? registerPatient.username.trim() : '';
    if (username.length <= 0) {
      notification.addError('username is required', null);
    }

    const password: string = registerPatient.password ? registerPatient.password.trim() : '';
    if (password.length <= 0) {
      notification.addError('password is required', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }
    const patient: Patient = await this.patientRepository.getByDni(dni);
    if (patient != null) notification.addError('dni is taken', null);
    
    return notification;
  }
}