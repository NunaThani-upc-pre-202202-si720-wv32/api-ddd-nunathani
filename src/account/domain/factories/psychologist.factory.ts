import { AuditTrail } from '../../../shared/domain/values/audit-trail.value';
import { PsychologistName } from '../../../shared/domain/values/psychologist-name.value';
import { Psychologist } from '../aggregates/client/psychologist.entity';
import { ClientId } from '../aggregates/client/client-id.value';
import { Email } from 'src/shared/domain/values/email.value';
import { UserPhone } from 'src/shared/domain/values/user-phone.value';
import { Username } from 'src/shared/domain/values/username.value';
import { Password } from 'src/shared/domain/values/password.value';

export class PsychologistFactory {
  public static withId(id: ClientId, 
    name: PsychologistName, 
    auditTrail: AuditTrail,
    email: Email,
    userPhone: UserPhone,
    username: Username,
    password: Password): Psychologist {
    let psychologist: Psychologist = new Psychologist(name, email, auditTrail, userPhone, username, password);
    psychologist.changeId(id);
    return psychologist;
  }

  public static from(name: PsychologistName, 
    auditTrail: AuditTrail,
    email: Email, 
    userPhone: UserPhone,
    username: Username,
    password: Password
    ): Psychologist {
    return new Psychologist(name, email, auditTrail, userPhone, username, password);
  }
}