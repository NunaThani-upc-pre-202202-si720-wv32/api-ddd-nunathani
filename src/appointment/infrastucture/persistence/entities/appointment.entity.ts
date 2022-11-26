
import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';
import { AppointmentDateValue } from '../values/Appointment-date.value';
import { AppointmentTopicValue } from '../values/Appointment-topic.value';

@Entity('appointments')
@TableInheritance({ column: 'type', })
export class AppointmentEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public id: number;

  @Column((type) => AppointmentTopicValue, { prefix: false })
  public topic: AppointmentTopicValue;

  @Column((type) => AppointmentDateValue, {prefix: false })
  public date: AppointmentDateValue;
    //appointmentEntity: import("c:/Users/toni_/OneDrive/Escritorio/UNVERSIDAD/Ciclo 5/Diseño y patrones de software/api-ddd-nunathani/src/appointment/infrastucture/persistence/values/appointment-topic.value").AppointmentTopicValue;
}