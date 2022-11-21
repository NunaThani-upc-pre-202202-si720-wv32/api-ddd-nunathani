import { ChildEntity, Column } from 'typeorm';
import { ClientType } from '../../../domain/aggregates/client/client-type.enum';
import { PsychologistNameValue } from '../values/psychologist-name.value';
import { ClientEntity } from './client.entity';

@ChildEntity(ClientType.PSYCHOLOGIST)
export class PsychologistEntity extends ClientEntity {
  @Column((type) => PsychologistNameValue, { prefix: false })
  public psychologistName: PsychologistNameValue;
}