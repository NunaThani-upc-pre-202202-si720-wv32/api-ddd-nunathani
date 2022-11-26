import { Inject, Injectable } from '@nestjs/common';
import { AppNotification } from 'src/shared/application/app.notification';
import { RegisterAppointment } from '../messages/commands/register-appointment.command';
import { AppointmentRepository, APPOINTMENT_REPOSITORY } from 'src/appointment/domain/aggregates/appointment/appointment.repository';

@Injectable()
export class RegisterAppointmentValidator {
  constructor(
    @Inject(APPOINTMENT_REPOSITORY)
    private appointmentRepository: AppointmentRepository,
  ) {
  }

  public async validate(registerAppointment: RegisterAppointment,): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();

    const topic: string = registerAppointment.topic ? registerAppointment.topic.trim() : '';
    if (topic.length <= 0) {
      notification.addError('topic is required', null);
    }

    const date: string = registerAppointment.date ? registerAppointment.date.trim() : '';
    if (date.length <= 0) {
      notification.addError('date is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    // const appointment: Appointment = await this.appointmentRepository.getByDate(date);
    // if (appointment != null) notification.addError('date is already used', null);
    
    return notification;
  }
}