import { ClientId } from './client-id.value';
import { Client } from './client.root.entity';
import { PsychologistName } from 'src/shared/domain/values/psychologist-name.value';
import { AuditTrail } from 'src/shared/domain/values/audit-trail.value';
import { ClientType } from 'src/clients/domain/aggregates/client/client-type.enum';
import { PsychologistRegistered } from 'src/clients/domain/events/psychologist-registered.event';
import { Email } from 'src/shared/domain/values/email.value';

export class Psychologist extends Client {
  private name: PsychologistName;
  
  public constructor(name: PsychologistName, email: Email, auditTrail: AuditTrail) {
    super(ClientType.PSYCHOLOGIST, email, auditTrail);
    this.name = name;
  }

  public register() {
    const event = new PsychologistRegistered(
      this.id.getValue(), 
      this.name.getValue(),
      this.email.getValue());
    this.apply(event);
  }

  public getId(): ClientId {
    return this.id;
  }

  public getName(): PsychologistName {
    return this.name;
  }

  public changeName(name: PsychologistName): void {
    this.name = name;
  }

  public getEmail(): Email {
    return this.email;
  }
}