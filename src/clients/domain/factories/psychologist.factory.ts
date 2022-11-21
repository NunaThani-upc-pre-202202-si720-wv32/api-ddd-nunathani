import { AuditTrail } from '../../../shared/domain/values/audit-trail.value';
import { PsychologistName } from '../../../shared/domain/values/psychologist-name.value';
import { Psychologist } from '../aggregates/client/psychologist.entity';
import { ClientId } from '../aggregates/client/client-id.value';

export class PsychologistFactory {
  public static withId(id: ClientId, name: PsychologistName, auditTrail: AuditTrail): Psychologist {
    let psychologist: Psychologist = new Psychologist(name, auditTrail);
    psychologist.changeId(id);
    return psychologist;
  }

  public static from(name: PsychologistName, auditTrail: AuditTrail): Psychologist {
    return new Psychologist(name, auditTrail);
  }
}