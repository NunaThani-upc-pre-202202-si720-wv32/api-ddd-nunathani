import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterAppointment } from '../../messages/commands/register-appointment.command';
import { AppointmentMapper } from '../../mappers/appointment.mapper';
import { Appointment } from 'src/appointment/domain/aggregates/appointment/appointment.root.entity';
import { Inject } from '@nestjs/common';
import { AppointmentRepository } from 'src/appointment/domain/aggregates/appointment/appointment.repository';
import { AppSettings } from 'src/shared/application/app-settings';
import { DataSource } from 'typeorm';
import { APPOINTMENT_REPOSITORY } from 'src/appointment/domain/aggregates/appointment/appointment.repository';

@CommandHandler(RegisterAppointment)
export class RegisterAppointmentHandler
  implements ICommandHandler<RegisterAppointment> {
  constructor(
    private dataSource: DataSource,
    @Inject(APPOINTMENT_REPOSITORY)
    private readonly appointmentRepository: AppointmentRepository,
    private publisher: EventPublisher
  ) {
  }

  async execute(command: RegisterAppointment) {
    let appointment: Appointment = AppointmentMapper.commandToDomain(command);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      appointment = await this.appointmentRepository.create(appointment);
      if (appointment == null) throw new Error('');
      appointment = this.publisher.mergeObjectContext(appointment);
      appointment.register();
      appointment.commit();
      await queryRunner.commitTransaction();
    } catch(err) {
      await queryRunner.rollbackTransaction();
      appointment = null;
    } finally {
      await queryRunner.release();
    }
    return appointment;
  }
}