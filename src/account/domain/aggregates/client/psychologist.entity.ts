import { ClientId } from './client-id.value';
import { Client } from './client.root.entity';
import { PsychologistName } from 'src/shared/domain/values/psychologist-name.value';
import { AuditTrail } from 'src/shared/domain/values/audit-trail.value';
import { ClientType } from 'src/account/domain/aggregates/client/client-type.enum';
import { PsychologistRegistered } from 'src/account/domain/events/psychologist-registered.event';
import { Email } from 'src/shared/domain/values/email.value';
import { UserPhone } from 'src/shared/domain/values/user-phone.value';
import { Username } from 'src/shared/domain/values/username.value';
import { Password } from 'src/shared/domain/values/password.value';

export class Psychologist extends Client {
  private name: PsychologistName;
  private userPhone: UserPhone;
  private username: Username;
  private password: Password;

  public constructor(name: PsychologistName,
    email: Email,
    auditTrail: AuditTrail,
    userPhone: UserPhone,
    username: Username,
    password: Password) {
    super(ClientType.PSYCHOLOGIST, email, auditTrail);
    this.name = name;
    this.userPhone = userPhone;
    this.username = username;
    this.password = password;
  }

  public register() {
    const event = new PsychologistRegistered(
      this.id.getValue(),
      this.name.getValue(),
      this.email.getValue(),
      this.username.getValue(),
      this.password.getValue(),
      this.userPhone.getValue()
    );
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

  public getUserPhone(): UserPhone {
    return this.userPhone;
  }

  public getUsername(): Username {
    return this.username;
  }

  public getPassword(): Password {
    return this.password;
  }
}