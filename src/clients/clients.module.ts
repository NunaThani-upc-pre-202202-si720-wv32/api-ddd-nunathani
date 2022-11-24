import { Module } from '@nestjs/common';
import { PsychologistApplicationService } from './application/services/psychologist-application.service';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterPatientValidator } from './application/validators/register-patient.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterPsychologistHandler } from './application/handlers/commands/register-psychologist.handler';
import { PatientRegisteredHandler } from '../notifications/application/handlers/events/patient-registered.handler';
import { GetPatientClientsHandler } from './application/handlers/queries/get-patient-clients.handler';
import { PatientApplicationService } from './application/services/patient-application.service';
import { RegisterPsychologistValidator } from './application/validators/register-psychologist.validator';
import { RegisterPatientHandler } from './application/handlers/commands/register-patient.handler';
import { PsychologistRegisteredHandler } from '../notifications/application/handlers/events/psychologist-registered.handler';
import { ClientEntity } from './infrastructure/persistence/entities/client.entity';
import { PatientEntity } from './infrastructure/persistence/entities/patient.entity';
import { PsychologistEntity } from './infrastructure/persistence/entities/psychologist.entity';
import { PatientController } from './interface/rest/patient.controller';
import { PsychologistController } from './interface/rest/psychologist.controller';
import { PatientEntityRepository } from './infrastructure/persistence/repositories/patient.repository';
import { PsychologistEntityRepository } from './infrastructure/persistence/repositories/psychologist.repository';
import { GetPsychologistClientsHandler } from './application/handlers/queries/get-psychologist-clients.handler';
import { PERSON_REPOSITORY } from './domain/aggregates/client/patient.repository';
import { PSYCHOLOGIST_REPOSITORY } from './domain/aggregates/client/psychologist.repository';

export const CommandHandlers = [RegisterPatientHandler, RegisterPsychologistHandler];
export const EventHandlers = [PatientRegisteredHandler, PsychologistRegisteredHandler];
export const QueryHandlers = [GetPatientClientsHandler, GetPsychologistClientsHandler];

@Module({
  imports: [
  CqrsModule,
    TypeOrmModule.forFeature([ClientEntity, PatientEntity, PsychologistEntity]),
  ],
  exports: [TypeOrmModule],
  controllers: [PatientController, PsychologistController],
  providers: [
    { useClass: PatientEntityRepository, provide: PERSON_REPOSITORY },
    { useClass: PsychologistEntityRepository, provide: PSYCHOLOGIST_REPOSITORY },
    PatientApplicationService,
    PsychologistApplicationService,
    RegisterPatientValidator,
    RegisterPsychologistValidator,
    PatientEntityRepository,
    PsychologistEntityRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class ClientsModule {}