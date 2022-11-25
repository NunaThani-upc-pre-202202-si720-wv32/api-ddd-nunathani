import { ClientType } from 'src/account/domain/aggregates/client/client-type.enum';
import { PatientRegistered } from 'src/account/domain/events/patient-registered.event';
import { AuditTrail } from 'src/shared/domain/values/audit-trail.value';
import { PatientName } from 'src/shared/domain/values/patient-name.value';
import { ClientId } from './client-id.value';
import { Dni } from '../../../../shared/domain/values/dni.value';
import { Client } from './client.root.entity';
import { Email } from 'src/shared/domain/values/email.value';
import { UserPhone } from 'src/shared/domain/values/user-phone.value';
import { Password } from 'src/shared/domain/values/password.value';
import { Username } from 'src/shared/domain/values/username.value';

export class Patient extends Client {
  private name: PatientName;
  private dni: Dni;
  private userPhone: UserPhone;
  private username: Username;
  private password: Password;

  public constructor(name: PatientName, 
    dni: Dni,
    email: Email, 
    auditTrail: AuditTrail, 
    userPhone: UserPhone,
    username: Username,
    password: Password) {
    super(ClientType.PATIENT, email, auditTrail);
    this.name = name;
    this.dni = dni;
    this.userPhone = userPhone;
    this.username = username;
    this.password = password;
  }

  public register() {
    const event = new PatientRegistered(this.id.getValue(), 
    this.name.getFirstName(), 
    this.name.getLastName(), 
    this.dni.getValue(),
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

  public getName(): PatientName {
    return this.name;
  }

  public getDni(): Dni {
    return this.dni;
  }

  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }

  public changeName(name: PatientName): void {
    this.name = name;
  }

  public changeDni(dni: Dni): void {
    this.dni = dni;
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