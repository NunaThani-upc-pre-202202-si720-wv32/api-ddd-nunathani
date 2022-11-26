import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentRegisteredHandler } from 'src/notifications/application/handlers/events/appointment-registered.handler';
import { RegisterAppointmentHandler } from './application/handlers/commands/register-appointment';
import { GetAppointmentHandler } from './application/handlers/queries/get-appointment.handler';
import { AppointmentApplicationService } from './application/services/appointment-application.service';
import { RegisterAppointmentValidator } from './application/validators/register-appointment.validator';
import { APPOINTMENT_REPOSITORY } from './domain/aggregates/appointment/appointment.repository';
import { AppointmentEntity } from './infrastucture/persistence/entities/appointment.entity';
import { AppointmentEntityRepository } from './infrastucture/persistence/repositories/appointment.repository';
import { AppointmentController } from './interface/rest/appointment.controller';

export const CommandHandlers = [RegisterAppointmentHandler];
export const EventHandlers = [AppointmentRegisteredHandler];
export const QueryHandlers = [GetAppointmentHandler];

@Module({
  imports: [
  CqrsModule,
    TypeOrmModule.forFeature([AppointmentEntity]),
  ],
  exports: [TypeOrmModule],
  controllers: [AppointmentController],
  providers: [
    { useClass: AppointmentEntityRepository, provide: APPOINTMENT_REPOSITORY },
    AppointmentApplicationService,
    RegisterAppointmentValidator,
    AppointmentEntityRepository,
 
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class AppointmentModule {}