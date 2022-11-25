import { PasswordValue } from '../values/password.value';
import { UserPhoneValue } from '../values/user-phone.value';
import { UsernameValue } from '../values/username.value';
import { ChildEntity, Column } from 'typeorm';
import { ClientType } from '../../../domain/aggregates/client/client-type.enum';
import { DniValue } from '../values/dni.value';
import { PatientNameValue } from '../values/patient-name.value';
import { ClientEntity } from './client.entity';

@ChildEntity(ClientType.PATIENT)
export class PatientEntity extends ClientEntity {
  @Column((type) => PatientNameValue, { prefix: false })
  public name: PatientNameValue;

  @Column((type) => DniValue, { prefix: false })
  public dni: DniValue;

  @Column((type) => UserPhoneValue, { prefix: false })
  public userPhone: UserPhoneValue;

  @Column((type) => UsernameValue, { prefix: false })
  public username: UsernameValue;

  @Column((type) => PasswordValue, { prefix: false })
  public password: PasswordValue;
}