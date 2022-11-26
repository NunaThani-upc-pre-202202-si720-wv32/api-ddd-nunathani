import { AppointmentDate } from "src/appointment/domain/aggregates/appointment/appointment-date.value";
import { AppointmentId } from "src/appointment/domain/aggregates/appointment/appointment-id.value";
import { Appointment } from "src/appointment/domain/aggregates/appointment/appointment.root.entity";
import { AppointmentFactory } from "src/appointment/domain/factories/appointment.factory";
import { AppointmentEntity } from "src/appointment/infrastucture/persistence/entities/appointment.entity";
import { AppointmentDateValue } from "src/appointment/infrastucture/persistence/values/Appointment-date.value";
import { AppointmentTopicValue } from "src/appointment/infrastucture/persistence/values/Appointment-topic.value";
import { AppointmentTopic } from "src/shared/domain/values/appointment-topic.value";
import { AppointmentDto } from "../dto/response/appointment.dto";
import { RegisterAppointment } from "../messages/commands/register-appointment.command";
import { RegisterAppointmentRequest } from "../dto/request/register-appointment-request.dto";
import { RegisterAppointmentResponse } from "../dto/response/register-appointment-response.dto";

export class AppointmentMapper {

    public static dtoRequestToCommand(RegisterAppointmentRequest: RegisterAppointmentRequest ){
        return new RegisterAppointment(
            RegisterAppointmentRequest.topic, 
            RegisterAppointmentRequest.date);
    }

    public static domainToDtoResponse(appointment: Appointment): RegisterAppointmentResponse{
        console.log(appointment);
        return new RegisterAppointmentResponse(
            appointment.getId().getValue(), 
            appointment.getTopic().gettopic(), 
            appointment.getDate().getValue().toString()
            );
    }


    public static commandToDomain(command: RegisterAppointment): Appointment {
        const topic: AppointmentTopic = AppointmentTopic.createResult(command.topic).getOrNull();
        const date: AppointmentDate = AppointmentDate.fromString(command.date);
        let appointment: Appointment = AppointmentFactory.from(topic, date);
        
        return appointment;
    }

    
    public static domainToEntity(appointment: Appointment): AppointmentEntity {
        const appointmentEntity: AppointmentEntity = new AppointmentEntity();

        appointmentEntity.topic = AppointmentTopicValue.from(appointment.getTopic().gettopic());
        appointmentEntity.date = AppointmentDateValue.from(appointment.getDate().getValue());

        return appointmentEntity;
    }


    public static entityToDomain(appointmentEntity: AppointmentEntity): Appointment {

        if(appointmentEntity == null){
            return null;
        }
        const topic: AppointmentTopic = AppointmentTopic.createResult(appointmentEntity.topic.value).getOrNull();
        const date: AppointmentDate = AppointmentDate.fromString(appointmentEntity.date.value.toString());
        const appointmentId: AppointmentId = AppointmentId.of(appointmentEntity.id);
        let appointment: Appointment = AppointmentFactory.withId(appointmentId, topic, date);
        return appointment;
    }


    public static ormToAppointmentDto(row: any): AppointmentDto{
        let dto = new AppointmentDto();
        dto.id = row.id;
        dto.topic = row.topic;
        dto.date = row.date;

        return dto;
    }

}