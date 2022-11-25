import { ChildEntity, Column } from 'typeorm';
import { ClientType } from '../../../domain/aggregates/client/client-type.enum';
import { PasswordValue } from '../values/password.value';
import { PsychologistNameValue } from '../values/psychologist-name.value';
import { UserPhoneValue } from '../values/user-phone.value';
import { UsernameValue } from '../values/username.value';
import { ClientEntity } from './client.entity';

@ChildEntity(ClientType.PSYCHOLOGIST)
export class PsychologistEntity extends ClientEntity {
  @Column((type) => PsychologistNameValue, { prefix: false })
  public psychologistName: PsychologistNameValue;

  @Column((type) => UserPhoneValue, { prefix: false })
  public userPhone: UserPhoneValue;

  @Column((type) => UsernameValue, { prefix: false })
  public username: UsernameValue;

  @Column((type) => PasswordValue, { prefix: false })
  public password: PasswordValue;
}