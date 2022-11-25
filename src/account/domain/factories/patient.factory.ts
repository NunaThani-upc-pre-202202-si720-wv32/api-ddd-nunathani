import { AuditTrail } from '../../../shared/domain/values/audit-trail.value';
import { PatientName } from '../../../shared/domain/values/patient-name.value';
import { Patient } from '../aggregates/client/patient.entity';
import { ClientId } from '../aggregates/client/client-id.value';
import { Dni } from '../../../shared/domain/values/dni.value';
import { Email } from 'src/shared/domain/values/email.value';
import { UserPhone } from 'src/shared/domain/values/user-phone.value';
import { Username } from 'src/shared/domain/values/username.value';
import { Password } from 'src/shared/domain/values/password.value';

export class PatientFactory {
  public static withId(id: ClientId, 
    name: PatientName, 
    dni: Dni, 
    auditTrail: AuditTrail,
    email: Email,
    userPhone: UserPhone,
    username: Username,
    password: Password): Patient {
    let patient: Patient = new Patient(name, dni, email, auditTrail, userPhone, username, password);
    patient.changeId(id);
    return patient;
  }

  public static from(name: PatientName, 
    dni: Dni, 
    auditTrail: AuditTrail,
    email: Email,
    userPhone: UserPhone,
    username: Username,
    password: Password): Patient {
    return new Patient(name, dni, email, auditTrail, userPhone, username, password);
  }
}