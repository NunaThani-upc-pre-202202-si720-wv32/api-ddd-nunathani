import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterAppointmentRequest } from '../dto/request/register-appointment-request.dto';
import { RegisterAppointmentResponse } from '../dto/response/register-appointment-response.dto';
import { RegisterAppointmentValidator } from '../validators/register-appointment.validator';
import { AppNotification } from 'src/shared/application/app.notification';
import { Result } from 'typescript-result';
import { RegisterAppointment } from '../messages/commands/register-appointment.command';
import { AppointmentRepository, APPOINTMENT_REPOSITORY } from 'src/appointment/domain/aggregates/appointment/appointment.repository';
import { Appointment } from 'src/appointment/domain/aggregates/appointment/appointment.root.entity';
import { AppointmentMapper } from '../mappers/appointment.mapper';

@Injectable()
export class AppointmentApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerAppointmentValidator: RegisterAppointmentValidator,
    @Inject(APPOINTMENT_REPOSITORY)
    private readonly appointmentRepository: AppointmentRepository,
  ) {}

  async register(
    registerAppointmentRequest: RegisterAppointmentRequest,
  ): Promise<Result<AppNotification, RegisterAppointmentResponse>> {
    const registerAppointment: RegisterAppointment = AppointmentMapper.dtoRequestToCommand(registerAppointmentRequest);
    const notification: AppNotification = await this.registerAppointmentValidator.validate(registerAppointment);
    if (notification.hasErrors()) return Result.error(notification);
    const appointment: Appointment = await this.commandBus.execute(registerAppointment);
    const response: RegisterAppointmentResponse = AppointmentMapper.domainToDtoResponse(appointment);
    return Result.ok(response);
  }

  async getById(id: number) {
    return await this.appointmentRepository.getById(id);
  }

  async getByTopic(topic: string) {
    return await this.appointmentRepository.getByTopic(topic);
  }
  
  async delete(id: number) {
    return await this.appointmentRepository.delete(id);
  }
}