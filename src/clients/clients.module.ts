import { Module } from '@nestjs/common';
import { PsychologistApplicationService } from './application/services/psychologist-application.service';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterPersonValidator } from './application/validators/register-patient.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterPsychologistHandler } from './application/handlers/commands/register-psychologist.handler';
import { PersonRegisteredHandler } from '../notifications/application/handlers/events/patient-registered.handler';
import { GetPersonClientsHandler } from './application/handlers/queries/get-patient-clients.handler';
import { PersonApplicationService } from './application/services/patient-application.service';
import { RegisterPsychologistValidator } from './application/validators/register-psychologist.validator';
import { RegisterPersonHandler } from './application/handlers/commands/register-patient.handler';
import { PsychologistRegisteredHandler } from '../notifications/application/handlers/events/psychologist-registered.handler';
import { ClientEntity } from './infrastructure/persistence/entities/client.entity';
import { PersonEntity } from './infrastructure/persistence/entities/patient.entity';
import { PsychologistEntity } from './infrastructure/persistence/entities/psychologist.entity';
import { PersonController } from './interface/rest/patient.controller';
import { PsychologistController } from './interface/rest/psychologist.controller';
import { PersonEntityRepository } from './infrastructure/persistence/repositories/patient.repository';
import { PsychologistEntityRepository } from './infrastructure/persistence/repositories/psychologist.repository';
import { GetPsychologistClientsHandler } from './application/handlers/queries/get-psychologist-clients.handler';
import { PERSON_REPOSITORY } from './domain/aggregates/client/patient.repository';
import { PSYCHOLOGIST_REPOSITORY } from './domain/aggregates/client/psychologist.repository';

export const CommandHandlers = [RegisterPersonHandler, RegisterPsychologistHandler];
export const EventHandlers = [PersonRegisteredHandler, PsychologistRegisteredHandler];
export const QueryHandlers = [GetPersonClientsHandler, GetPsychologistClientsHandler];

@Module({
  imports: [
  CqrsModule,
    TypeOrmModule.forFeature([ClientEntity, PersonEntity, PsychologistEntity]),
  ],
  exports: [TypeOrmModule],
  controllers: [PersonController, PsychologistController],
  providers: [
    { useClass: PersonEntityRepository, provide: PERSON_REPOSITORY },
    { useClass: PsychologistEntityRepository, provide: PSYCHOLOGIST_REPOSITORY },
    PersonApplicationService,
    PsychologistApplicationService,
    RegisterPersonValidator,
    RegisterPsychologistValidator,
    PersonEntityRepository,
    PsychologistEntityRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class ClientsModule {}