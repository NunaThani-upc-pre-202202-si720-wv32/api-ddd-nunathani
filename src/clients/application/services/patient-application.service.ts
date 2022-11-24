import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterPersonRequest } from '../dtos/request/register-patient-request.dto';
import { RegisterPersonResponse } from '../dtos/response/register-patient-response.dto';
import { RegisterPersonValidator } from '../validators/register-patient.validator';
import { AppNotification } from 'src/shared/application/app.notification';
import { Result } from 'typescript-result';
import { RegisterPerson } from '../messages/commands/register-patient.command';
import { PersonRepository, PERSON_REPOSITORY } from 'src/clients/domain/aggregates/client/patient.repository';
import { Patient } from 'src/clients/domain/aggregates/client/patient.entity';
import { PersonMapper } from '../mappers/patient.mapper';

@Injectable()
export class PersonApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerPersonValidator: RegisterPersonValidator,
    @Inject(PERSON_REPOSITORY)
    private readonly personRepository: PersonRepository,
  ) {}

  async register(
    registerPersonRequest: RegisterPersonRequest,
  ): Promise<Result<AppNotification, RegisterPersonResponse>> {
    const registerPerson: RegisterPerson = PersonMapper.dtoRequestToCommand(registerPersonRequest);
    const notification: AppNotification = await this.registerPersonValidator.validate(registerPerson);
    if (notification.hasErrors()) return Result.error(notification);
    const patient: Patient = await this.commandBus.execute(registerPerson);
    const response: RegisterPersonResponse = PersonMapper.domainToDtoResponse(patient);
    return Result.ok(response);
  }

  async getById(id: number) {
    return await this.personRepository.getById(id);
  }
}