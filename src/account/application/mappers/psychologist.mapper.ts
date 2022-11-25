import { Psychologist } from 'src/account/domain/aggregates/client/psychologist.entity';
import { ClientId } from 'src/account/domain/aggregates/client/client-id.value';

import { PsychologistFactory } from 'src/account/domain/factories/psychologist.factory';
import { PsychologistEntity } from 'src/account/infrastructure/persistence/entities/psychologist.entity';
import { PsychologistNameValue } from 'src/account/infrastructure/persistence/values/psychologist-name.value';

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
import { EmailValue } from 'src/account/infrastructure/persistence/values/email.value';
import { UserPhone } from 'src/shared/domain/values/user-phone.value';
import { Password } from 'src/shared/domain/values/password.value';
import { Username } from 'src/shared/domain/values/username.value';
import { UserPhoneValue } from 'src/account/infrastructure/persistence/values/user-phone.value';
import { UsernameValue } from 'src/account/infrastructure/persistence/values/username.value';
import { PasswordValue } from 'src/account/infrastructure/persistence/values/password.value';

export class PsychologistMapper {
  public static dtoRequestToCommand(registerPsychologistRequest: RegisterPsychologistRequest): RegisterPsychologist {
    return new RegisterPsychologist(
      registerPsychologistRequest.name,
      registerPsychologistRequest.email,
      registerPsychologistRequest.userPhone,
      registerPsychologistRequest.username,
      registerPsychologistRequest.password
    );
  }

  public static domainToDtoResponse(psychologist: Psychologist): RegisterPsychologistResponse {
    return new RegisterPsychologistResponse(
      psychologist.getId().getValue(),
      psychologist.getName().getValue(),
      psychologist.getAuditTrail().getCreatedAt().format(),
      psychologist.getAuditTrail().getCreatedBy().getValue(),
      psychologist.getEmail().getValue(),
      psychologist.getUserPhone().getValue(),
      psychologist.getUsername().getValue(),
      psychologist.getPassword().getValue()
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
    const userPhone: UserPhone = UserPhone.createResult(command.userPhone).getOrNull();
    const username: Username = Username.createResult(command.username).getOrNull();
    const password: Password = Password.create(command.password).getOrNull();
    let psychologist: Psychologist = PsychologistFactory.from(psychologistName, auditTrail, email, userPhone, username, password);
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
    psychologistEntity.email = EmailValue.from(psychologist.getEmail().getValue());
    psychologistEntity.userPhone = UserPhoneValue.from(psychologist.getUserPhone().getValue());
    psychologistEntity.username = UsernameValue.from(psychologist.getUsername().getValue());
    psychologistEntity.password = PasswordValue.from(psychologist.getPassword().getValue());
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
    const userPhone: UserPhone = UserPhone.create(psychologistEntity.userPhone.value);
    const username: Username = Username.create(psychologistEntity.username.value);
    const password: Password = Password.create(psychologistEntity.password.value).getOrNull();
    let psychologist: Psychologist = PsychologistFactory.withId(clientId, psychologistName, auditTrail, email, userPhone, username, password);
    return psychologist;
  }

  public static ormToPsychologistClientDto(row: any): PsychologistClientDto {
    let dto = new PsychologistClientDto();
    dto.id = Number(row.id);
    dto.psychologistName = row.psychologistName;
    dto.email = row.email;
    dto.userPhone = row.phone;
    dto.username = row.username;
    dto.password = row.password;
    return dto;
  }
}