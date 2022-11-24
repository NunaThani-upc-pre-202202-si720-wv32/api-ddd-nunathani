import { PersonEntity } from 'src/clients/infrastructure/persistence/entities/patient.entity';
import { Patient } from 'src/clients/domain/aggregates/client/patient.entity';
import { PersonNameValue } from 'src/clients/infrastructure/persistence/values/patient-name.value';
import { DniValue } from 'src/clients/infrastructure/persistence/values/dni.value';
import { AuditTrailValue } from 'src/shared/infrastructure/persistence/values/audit-trail.value';
import { RegisterPerson } from '../messages/commands/register-patient.command';
import { PersonName } from 'src/shared/domain/values/patient-name.value';
import { Dni } from 'src/shared/domain/values/dni.value';
import { AuditTrail } from 'src/shared/domain/values/audit-trail.value';
import { DateTime } from 'src/shared/domain/values/date-time.value';
import { UserId } from 'src/users/domain/aggregates/user/user-id.value';
import { PersonFactory } from 'src/clients/domain/factories/patient.factory';
import { PersonClientDto } from '../dtos/response/patient-client.dto';
import { ClientId } from 'src/clients/domain/aggregates/client/client-id.value';
import { RegisterPersonRequest } from '../dtos/request/register-patient-request.dto';
import { RegisterPersonResponse } from '../dtos/response/register-patient-response.dto';

export class PersonMapper {
  public static dtoRequestToCommand(registerPersonRequest: RegisterPersonRequest) {
    return new RegisterPerson(
      registerPersonRequest.firstName,
      registerPersonRequest.lastName,
      registerPersonRequest.dni,
    );
  }

  public static domainToDtoResponse(patient: Patient) {
    
    return new RegisterPersonResponse(
      patient.getId().getValue(),
      patient.getName().getFirstName(),
      patient.getName().getLastName(),
      patient.getDni().getValue(),
      patient.getAuditTrail().getCreatedAt().format(),
      patient.getAuditTrail().getCreatedBy().getValue()
    );
  }
  
  public static commandToDomain(command: RegisterPerson, userId: number): Patient {
    const personName: PersonName = PersonName.create(command.firstName, command.lastName);
    const dni: Dni = Dni.create(command.dni);
    const auditTrail: AuditTrail = AuditTrail.from(
      DateTime.utcNow(),
      UserId.of(userId),
      null,
      null
    );
    let patient: Patient = PersonFactory.from(personName, dni, auditTrail);
    return patient;
  }

  public static domainToEntity(patient: Patient): PersonEntity {
    const personEntity: PersonEntity = new PersonEntity();
    personEntity.name = PersonNameValue.from(patient.getName().getFirstName(), patient.getName().getLastName());
    personEntity.dni = DniValue.from(patient.getDni().getValue());
    const createdAt: string = patient.getAuditTrail() != null && patient.getAuditTrail().getCreatedAt() != null ? patient.getAuditTrail().getCreatedAt().format() : null;
    const createdBy: number = patient.getAuditTrail() != null && patient.getAuditTrail().getCreatedBy() != null ? patient.getAuditTrail().getCreatedBy().getValue() : null;
    const updatedAt: string = patient.getAuditTrail() != null && patient.getAuditTrail().getUpdatedAt() != null ? patient.getAuditTrail().getUpdatedAt().format() : null;
    const updatedBy: number = patient.getAuditTrail() != null && patient.getAuditTrail().getUpdatedBy() != null ? patient.getAuditTrail().getUpdatedBy().getValue() : null;
    const auditTrailValue: AuditTrailValue = AuditTrailValue.from(createdAt, createdBy, updatedAt, updatedBy);
    personEntity.auditTrail = auditTrailValue;
    return personEntity;
  }

  public static entityToDomain(personEntity: PersonEntity): Patient {
    if (personEntity == null) return null;
    const personName: PersonName = PersonName.create(personEntity.name.firstName, personEntity.name.lastName);
    const dni: Dni = Dni.create(personEntity.dni.value);
    const auditTrail: AuditTrail = AuditTrail.from(
      personEntity.auditTrail.createdAt != null ? DateTime.fromString(personEntity.auditTrail.createdAt) : null,
      personEntity.auditTrail.createdBy != null ? UserId.of(personEntity.auditTrail.createdBy) : null,
      personEntity.auditTrail.updatedAt != null ? DateTime.fromString(personEntity.auditTrail.updatedAt) : null,
      personEntity.auditTrail.updatedBy != null ? UserId.of(personEntity.auditTrail.updatedBy) : null
    );
    const clientId: ClientId = ClientId.of(personEntity.id);
    let patient: Patient = PersonFactory.withId(clientId, personName, dni, auditTrail);
    return patient;
  }

  public static ormToPersonClientDto(row: any): PersonClientDto {
    let dto = new PersonClientDto();
    dto.id = Number(row.id);
    dto.firstName = row.firstName;
    dto.lastName = row.lastName;
    dto.dni = row.dni;
    return dto;
  }
}