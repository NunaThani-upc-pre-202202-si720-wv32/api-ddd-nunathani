import { AppointmentTopic } from "src/shared/domain/values/appointment-topic.value";
import { AppointmentDate } from "../aggregates/appointment/appointment-date.value";
import { AppointmentId } from "../aggregates/appointment/appointment-id.value";
import { Appointment } from "../aggregates/appointment/appointment.root.entity";

export class AppointmentFactory {
    public static withId(id: AppointmentId,
        topic: AppointmentTopic,
        date: AppointmentDate): Appointment {
        let appointment: Appointment = new Appointment(topic, date);
        appointment.changeId(id);
        return appointment;
    }

    public static from(topic: AppointmentTopic,
        date: AppointmentDate): Appointment {
        return new Appointment(topic, date);
    }
}