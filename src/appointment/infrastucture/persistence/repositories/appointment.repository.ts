import { InjectRepository } from "@nestjs/typeorm";
import { AppointmentMapper } from "src/appointment/application/mappers/appointment.mapper";
import { AppointmentRepository } from "src/appointment/domain/aggregates/appointment/appointment.repository";
import { Appointment } from "src/appointment/domain/aggregates/appointment/appointment.root.entity";
import { Repository } from "typeorm";
import { AppointmentEntity } from "../entities/appointment.entity";

export class AppointmentEntityRepository implements AppointmentRepository {

    constructor(
        @InjectRepository(AppointmentEntity)
        private appointmentRepository: Repository<AppointmentEntity>,
    ) { }

    async create(appointment: Appointment): Promise<Appointment> {
        let appointmentEntity: AppointmentEntity = AppointmentMapper.domainToEntity(appointment);
        appointmentEntity = await this.appointmentRepository.save(appointmentEntity);
        return AppointmentMapper.entityToDomain(appointmentEntity);
    }
    async update(appointment: Appointment): Promise<Appointment> {
        let appointmentEntity: AppointmentEntity = AppointmentMapper.domainToEntity(appointment);
        let appointmentId: number = appointment.getId().getValue();
        await this.appointmentRepository.update({ id: appointmentId }, appointmentEntity);
        return appointment;
    }
    async delete(appointmentId: number): Promise<boolean> {
        await this.appointmentRepository.delete({ id: appointmentId });
        return true;
    }
    async getById(id: number): Promise<Appointment> {
        let appointmentEntity: AppointmentEntity = await this.appointmentRepository.findOne({ where: { id: id } });
        return AppointmentMapper.entityToDomain(appointmentEntity);
    }
    async getByTopic(topic: string): Promise<Appointment> {
        let appointmentEntity: AppointmentEntity = await this.appointmentRepository.createQueryBuilder().where("topic = :topic", { topic }).getOne();
        return AppointmentMapper.entityToDomain(appointmentEntity);
    }

}