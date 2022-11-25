import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AppNotification } from 'src/shared/application/app.notification';
import { Result } from 'typescript-result';
import { RegisterPsychologistValidator } from '../validators/register-psychologist.validator';
import { RegisterPsychologist } from '../messages/commands/register-psychologist.command';
import { RegisterPsychologistRequest } from '../dtos/request/register-psychologist-request.dto';
import { RegisterPsychologistResponse } from '../dtos/response/register-psychologist-response.dto';
import { PsychologistRepository, PSYCHOLOGIST_REPOSITORY } from 'src/account/domain/aggregates/client/psychologist.repository';
import { PsychologistMapper } from '../mappers/psychologist.mapper';
import { Psychologist } from 'src/account/domain/aggregates/client/psychologist.entity';

@Injectable()
export class PsychologistApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerPsychologistValidator: RegisterPsychologistValidator,
    @Inject(PSYCHOLOGIST_REPOSITORY)
    private readonly psychologistRepository: PsychologistRepository,
  ) {}

  async getById(id: number) {
    return await this.psychologistRepository.getById(id);
  }

  async register(registerPsychologistRequest: RegisterPsychologistRequest): Promise<Result<AppNotification, RegisterPsychologistResponse>> {
    const registerPsychologist: RegisterPsychologist = PsychologistMapper.dtoRequestToCommand(registerPsychologistRequest);
    const notification: AppNotification = await this.registerPsychologistValidator.validate(registerPsychologist);
    if (notification.hasErrors()) return Result.error(notification);
    const psychologist: Psychologist = await this.commandBus.execute(registerPsychologist);
    const response: RegisterPsychologistResponse = PsychologistMapper.domainToDtoResponse(psychologist);
    return Result.ok(response);
  }

  async getByUsername(username: string) {
    return await this.psychologistRepository.getByUsername(username);
  }

  async delete(id: number) {
    return await this.psychologistRepository.delete(id);
  }
}