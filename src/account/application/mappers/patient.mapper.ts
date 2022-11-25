import { PatientEntity } from 'src/account/infrastructure/persistence/entities/patient.entity';
import { Patient } from 'src/account/domain/aggregates/client/patient.entity';
import { PatientNameValue } from 'src/account/infrastructure/persistence/values/patient-name.value';
import { DniValue } from 'src/account/infrastructure/persistence/values/dni.value';
import { AuditTrailValue } from 'src/shared/infrastructure/persistence/values/audit-trail.value';
import { RegisterPatient } from '../messages/commands/register-patient.command';
import { PatientName } from 'src/shared/domain/values/patient-name.value';
import { Dni } from 'src/shared/domain/values/dni.value';
import { AuditTrail } from 'src/shared/domain/values/audit-trail.value';
import { DateTime } from 'src/shared/domain/values/date-time.value';
import { UserId } from 'src/users/domain/aggregates/user/user-id.value';
import { PatientFactory } from 'src/account/domain/factories/patient.factory';
import { PatientClientDto } from '../dtos/response/patient-client.dto';
import { ClientId } from 'src/account/domain/aggregates/client/client-id.value';
import { RegisterPatientRequest } from '../dtos/request/register-patient-request.dto';
import { RegisterPatientResponse } from '../dtos/response/register-patient-response.dto';
import { Email } from 'src/shared/domain/values/email.value';
import { EmailValue } from 'src/account/infrastructure/persistence/values/email.value';
import { UserPhone } from 'src/shared/domain/values/user-phone.value';
import { Username } from 'src/shared/domain/values/username.value';
import { Password } from 'src/shared/domain/values/password.value';
import { UserPhoneValue } from 'src/account/infrastructure/persistence/values/user-phone.value';
import { UsernameValue } from 'src/account/infrastructure/persistence/values/username.value';
import { PasswordValue } from 'src/account/infrastructure/persistence/values/password.value';

export class PatientMapper {
  public static dtoRequestToCommand(registerPatientRequest: RegisterPatientRequest) {
    return new RegisterPatient(
      registerPatientRequest.firstName,
      registerPatientRequest.lastName,
      registerPatientRequest.dni,
      registerPatientRequest.email,
      registerPatientRequest.userPhone,
      registerPatientRequest.username,
      registerPatientRequest.password
    );
  }

  public static domainToDtoResponse(patient: Patient) : RegisterPatientResponse {
    
    return new RegisterPatientResponse(
      patient.getId().getValue(),
      patient.getName().getFirstName(),
      patient.getName().getLastName(),
      patient.getDni().getValue(),
      patient.getAuditTrail().getCreatedAt().format(),
      patient.getAuditTrail().getCreatedBy().getValue(),
      patient.getEmail().getValue(),
      patient.getUserPhone().getValue(),
      patient.getUsername().getValue(),
      patient.getPassword().getValue()
    );
  }
  
  public static commandToDomain(command: RegisterPatient, userId: number): Patient {
    const patientName: PatientName = PatientName.create(command.firstName, command.lastName);
    const dni: Dni = Dni.create(command.dni);
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
    let patient: Patient = PatientFactory.from(patientName, dni, auditTrail, email, userPhone, username, password);
    return patient;
  }

  public static domainToEntity(patient: Patient): PatientEntity {
    const patientEntity: PatientEntity = new PatientEntity();
    patientEntity.name = PatientNameValue.from(patient.getName().getFirstName(), patient.getName().getLastName());
    patientEntity.dni = DniValue.from(patient.getDni().getValue());
    const createdAt: string = patient.getAuditTrail() != null && patient.getAuditTrail().getCreatedAt() != null ? patient.getAuditTrail().getCreatedAt().format() : null;
    const createdBy: number = patient.getAuditTrail() != null && patient.getAuditTrail().getCreatedBy() != null ? patient.getAuditTrail().getCreatedBy().getValue() : null;
    const updatedAt: string = patient.getAuditTrail() != null && patient.getAuditTrail().getUpdatedAt() != null ? patient.getAuditTrail().getUpdatedAt().format() : null;
    const updatedBy: number = patient.getAuditTrail() != null && patient.getAuditTrail().getUpdatedBy() != null ? patient.getAuditTrail().getUpdatedBy().getValue() : null;
    const auditTrailValue: AuditTrailValue = AuditTrailValue.from(createdAt, createdBy, updatedAt, updatedBy);
    patientEntity.auditTrail = auditTrailValue;
    patientEntity.email = EmailValue.from(patient.getEmail().getValue());
    patientEntity.userPhone = UserPhoneValue.from(patient.getUserPhone().getValue());
    patientEntity.username = UsernameValue.from(patient.getUsername().getValue());
    patientEntity.password = PasswordValue.from(patient.getPassword().getValue());
    return patientEntity;
  }

  public static entityToDomain(patientEntity: PatientEntity): Patient {
    if (patientEntity == null) return null;
    const patientName: PatientName = PatientName.create(patientEntity.name.firstName, patientEntity.name.lastName);
    const dni: Dni = Dni.create(patientEntity.dni.value);
    const auditTrail: AuditTrail = AuditTrail.from(
      patientEntity.auditTrail.createdAt != null ? DateTime.fromString(patientEntity.auditTrail.createdAt) : null,
      patientEntity.auditTrail.createdBy != null ? UserId.of(patientEntity.auditTrail.createdBy) : null,
      patientEntity.auditTrail.updatedAt != null ? DateTime.fromString(patientEntity.auditTrail.updatedAt) : null,
      patientEntity.auditTrail.updatedBy != null ? UserId.of(patientEntity.auditTrail.updatedBy) : null
    );
    const email: Email = Email.create(patientEntity.email.value).getOrNull();
    const userPhone: UserPhone = UserPhone.create(patientEntity.userPhone.value);
    const username: Username = Username.create(patientEntity.username.value);
    const password: Password = Password.create(patientEntity.password.value).getOrNull();
    const clientId: ClientId = ClientId.of(patientEntity.id);
    let patient: Patient = PatientFactory.withId(clientId, patientName, dni, auditTrail, email, userPhone, username, password);
    return patient;
  }

  public static ormToPatientClientDto(row: any): PatientClientDto {
    let dto = new PatientClientDto();
    dto.id = Number(row.id);
    dto.firstName = row.firstName;
    dto.lastName = row.lastName;
    dto.dni = row.dni;
    dto.email = row.email;
    dto.userPhone = row.userPhone;
    dto.username = row.username;
    dto.password = row.password;
    return dto;
  }
}