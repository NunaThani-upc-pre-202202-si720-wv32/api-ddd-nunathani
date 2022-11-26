import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { AppointmentDto } from '../../dto/response/appointment.dto';
import { GetAppointment } from '../../messages/queries/get-appointment.query';
import { AppointmentMapper } from '../../mappers/appointment.mapper';

@QueryHandler(GetAppointment)
export class GetAppointmentHandler implements IQueryHandler<GetAppointment> {
  constructor(private dataSource: DataSource) {}

  async execute(query: GetAppointment) {
    const manager = this.dataSource.createEntityManager();
    const sql = `
    SELECT 
      id,
      topic,
      date
    FROM 
      appointments
    ORDER BY
      id;`;
    const rows = await manager.query(sql);
    if (rows.length <= 0) return [];
    const appointment: AppointmentDto[] = rows.map(function (row: any) {
      return AppointmentMapper.ormToAppointmentDto(row);
    });
    return appointment;
  }
}