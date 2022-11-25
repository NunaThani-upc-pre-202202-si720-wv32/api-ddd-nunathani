import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterPsychologist } from 'src/account/application/messages/commands/register-psychologist.command';
import { PsychologistMapper } from '../../mappers/psychologist.mapper';
import { Psychologist } from 'src/account/domain/aggregates/client/psychologist.entity';
import { Inject } from '@nestjs/common';
import { PsychologistRepository, PSYCHOLOGIST_REPOSITORY } from 'src/account/domain/aggregates/client/psychologist.repository';
import { AppSettings } from 'src/shared/application/app-settings';
import { DataSource } from 'typeorm';

@CommandHandler(RegisterPsychologist)
export class RegisterPsychologistHandler
  implements ICommandHandler<RegisterPsychologist> {
  constructor(
    private dataSource: DataSource,
    @Inject(PSYCHOLOGIST_REPOSITORY)
    private readonly psychologistRepository: PsychologistRepository,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: RegisterPsychologist) {
    let psychologist: Psychologist = PsychologistMapper.commandToDomain(command, AppSettings.SUPER_ADMIN);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      psychologist = await this.psychologistRepository.create(psychologist);
      if (psychologist == null) throw new Error("");
      psychologist = this.publisher.mergeObjectContext(psychologist);
      psychologist.register();
      psychologist.commit();
      await queryRunner.commitTransaction();
    } catch(err) {
      await queryRunner.rollbackTransaction();
      psychologist = null;
    } finally {
      await queryRunner.release();
    }
    return psychologist;
  }
}