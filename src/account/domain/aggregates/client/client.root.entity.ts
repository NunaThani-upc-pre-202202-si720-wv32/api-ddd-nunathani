import { AggregateRoot } from '@nestjs/cqrs';
import { ClientType } from 'src/account/domain/aggregates/client/client-type.enum';
import { AuditTrail } from 'src/shared/domain/values/audit-trail.value';
import { Email } from 'src/shared/domain/values/email.value';
import { ClientId } from './client-id.value';

export class Client extends AggregateRoot {
  protected id: ClientId;
  protected type: ClientType;
  protected readonly auditTrail: AuditTrail;
  protected email: Email;

  public constructor(type: ClientType, email: Email, auditTrail: AuditTrail) {
    super();
    this.type = type;
    this.auditTrail = auditTrail;
    this.email = email;
  }

  public getId(): ClientId {
    return this.id;
  }

  public getType(): ClientType {
    return this.type;
  }

  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }

  public changeId(id: ClientId) {
    this.id = id;
  }

  public getByEmail(): Email {
    return this.email;
  }

}