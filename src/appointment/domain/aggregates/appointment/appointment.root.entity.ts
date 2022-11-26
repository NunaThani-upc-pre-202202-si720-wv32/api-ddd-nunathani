import { AggregateRoot } from "@nestjs/cqrs";
import { AppointmentTopic } from "src/shared/domain/values/appointment-topic.value";
import { AppointmentRegistered } from "../../events/appointment-registered.event";
import { AppointmentDate } from "./appointment-date.value";
import { AppointmentId } from "./appointment-id.value";

export class Appointment extends AggregateRoot {
    protected id: AppointmentId;
    protected topic: AppointmentTopic;
    protected date: AppointmentDate;
    //agregar aquí de atributo el id del psyc y patient


    public constructor(topic: AppointmentTopic, date: AppointmentDate) {
        super();
        this.topic = topic;
        this.date = date;
    }

    public register(){
        const event = new AppointmentRegistered(this.id.getValue(), 
        this.topic.gettopic(), 
        (this.date.getValue()).toString()
        );
        this.apply(event);
    }

    public getId(): AppointmentId {
        return this.id;
    }

    public changeId(id: AppointmentId) {
        this.id = id;
      }

    public getTopic(): AppointmentTopic {
        return this.topic;
    }

    public getDate(): AppointmentDate {
        return this.date;
    }

}