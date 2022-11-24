import { Psychologist } from 'src/clients/domain/aggregates/client/psychologist.entity';
import { ClientId } from 'src/clients/domain/aggregates/client/client-id.value';

import { PsychologistFactory } from 'src/clients/domain/factories/psychologist.factory';
import { PsychologistEntity } from 'src/clients/infrastructure/persistence/entities/psychologist.entity';
import { PsychologistNameValue } from 'src/clients/infrastructure/persistence/values/psychologist-name.value';

import { AuditTrail } from 'src/shared/domain/values/audit-trail.value';
import { PsychologistName } from 'src/shared/domain/values/psychologist-name.value';
import { DateTime } from 'src/shared/domain/values/date-time.value';
import { AuditTrailValue } from 'src/shared/infrastructure/persistence/values/audit-trail.value';
import { UserId } from 'src/users/domain/aggregates/user/user-id.value';
import { PsychologistClientDto } from '../dtos/response/psychologist-client.dto';
import { RegisterPsychologist } from '../messages/commands/register-psychologist.command';
import { RegisterPsychologistRequest } from '../dtos/request/register-psychologist-request.dto';
import { RegisterPsychologistResponse } from '../dtos/response/register-psychologist-response.dto';
import { Email } from 'src/shared/domain/values/email.value';

export class PsychologistMapper {
  public static dtoRequestToCommand(registerPsychologistRequest: RegisterPsychologistRequest): RegisterPsychologist {
    return new RegisterPsychologist(
      registerPsychologistRequest.name,
      registerPsychologistRequest.email
    );
  }

  public static domainToDtoResponse(psychologist: Psychologist): RegisterPsychologistResponse {
    return new RegisterPsychologistResponse(
      psychologist.getId().getValue(),
      psychologist.getName().getValue(),
      psychologist.getAuditTrail().getCreatedAt().format(),
      psychologist.getAuditTrail().getCreatedBy().getValue(),
      psychologist.getEmail().getValue()
    );
  }

  public static commandToDomain(command: RegisterPsychologist, userId: number): Psychologist {
    const psychologistName: PsychologistName = PsychologistName.create(command.name);
    const auditTrail: AuditTrail = AuditTrail.from(
      DateTime.utcNow(),
      UserId.of(userId),
      null,
      null
    );
    const email: Email = Email.create(command.email).getOrNull();
    let psychologist: Psychologist = PsychologistFactory.from(psychologistName, auditTrail, email);
    return psychologist;
  }

  public static domainToEntity(psychologist: Psychologist): PsychologistEntity {
    const psychologistEntity: PsychologistEntity = new PsychologistEntity();
    psychologistEntity.psychologistName = PsychologistNameValue.from(psychologist.getName().getValue());
    
    const createdAt: string = psychologist.getAuditTrail() != null && psychologist.getAuditTrail().getCreatedAt() != null ? psychologist.getAuditTrail().getCreatedAt().format() : null;
    const createdBy: number = psychologist.getAuditTrail() != null && psychologist.getAuditTrail().getCreatedBy() != null ? psychologist.getAuditTrail().getCreatedBy().getValue() : null;
    const updatedAt: string = psychologist.getAuditTrail() != null && psychologist.getAuditTrail().getUpdatedAt() != null ? psychologist.getAuditTrail().getUpdatedAt().format() : null;
    const updatedBy: number = psychologist.getAuditTrail() != null && psychologist.getAuditTrail().getUpdatedBy() != null ? psychologist.getAuditTrail().getUpdatedBy().getValue() : null;
    const auditTrailValue: AuditTrailValue = AuditTrailValue.from(createdAt, createdBy, updatedAt, updatedBy);
    psychologistEntity.auditTrail = auditTrailValue;
    return psychologistEntity;
  }

  public static entityToDomain(psychologistEntity: PsychologistEntity): Psychologist {
    if (psychologistEntity == null) return null;
    const psychologistName: PsychologistName = PsychologistName.create(psychologistEntity.psychologistName.value);
    
    const auditTrail: AuditTrail = AuditTrail.from(
      psychologistEntity.auditTrail.createdAt != null ? DateTime.fromString(psychologistEntity.auditTrail.createdAt) : null,
      psychologistEntity.auditTrail.createdBy != null ? UserId.of(psychologistEntity.auditTrail.createdBy) : null,
      psychologistEntity.auditTrail.updatedAt != null ? DateTime.fromString(psychologistEntity.auditTrail.updatedAt) : null,
      psychologistEntity.auditTrail.updatedBy != null ? UserId.of(psychologistEntity.auditTrail.updatedBy) : null
    );
    const clientId: ClientId = ClientId.of(psychologistEntity.id);
    const email: Email = Email.create(psychologistEntity.email.value).getOrNull();
    let psychologist: Psychologist = PsychologistFactory.withId(clientId, psychologistName, auditTrail, email);
    return psychologist;
  }

  public static ormToPsychologistClientDto(row: any): PsychologistClientDto {
    let dto = new PsychologistClientDto();
    dto.id = Number(row.id);
    dto.psychologistName = row.psychologistName;
    dto.email = row.email;
    return dto;
  }
}