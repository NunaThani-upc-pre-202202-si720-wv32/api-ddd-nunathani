import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterPerson } from '../../messages/commands/register-patient.command';
import { PersonMapper } from '../../mappers/patient.mapper';
import { Patient } from 'src/clients/domain/aggregates/client/patient.entity';
import { Inject } from '@nestjs/common';
import { PersonRepository, PERSON_REPOSITORY } from 'src/clients/domain/aggregates/client/patient.repository';
import { AppSettings } from 'src/shared/application/app-settings';
import { DataSource } from 'typeorm';

@CommandHandler(RegisterPerson)
export class RegisterPersonHandler
  implements ICommandHandler<RegisterPerson> {
  constructor(
    private dataSource: DataSource,
    @Inject(PERSON_REPOSITORY)
    private readonly personRepository: PersonRepository,
    private publisher: EventPublisher
  ) {
  }

  async execute(command: RegisterPerson) {
    let patient: Patient = PersonMapper.commandToDomain(command, AppSettings.SUPER_ADMIN);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      patient = await this.personRepository.create(patient);
      if (patient == null) throw new Error("");
      patient = this.publisher.mergeObjectContext(patient);
      patient.register();
      patient.commit();
      await queryRunner.commitTransaction();
    } catch(err) {
      await queryRunner.rollbackTransaction();
      patient = null;
    } finally {
      await queryRunner.release();
    }
    return patient;
  }
}