import { Appointment } from "./appointment.root.entity";


export const APPOINTMENT_REPOSITORY = 'AppointmentRepository';

export interface AppointmentRepository {
    create(appointment: Appointment): Promise<Appointment>;
    update(appointment: Appointment): Promise<Appointment>;
    delete(appointmentId: number): Promise<boolean>;
    getById(id: number): Promise<Appointment>;
    getByTopic(topic: string): Promise<Appointment>;

}