import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { PsychologistClientDto } from '../../dtos/response/psychologist-client.dto';
import { PsychologistMapper } from '../../mappers/psychologist.mapper';
import { GetPsychologistClients } from '../../messages/queries/get-psychologist-account.query';

@QueryHandler(GetPsychologistClients)
export class GetPsychologistClientsHandler implements IQueryHandler<GetPsychologistClients> {
  constructor(private dataSource: DataSource) {}

  async execute(query: GetPsychologistClients) {
    const manager = this.dataSource.createEntityManager();
    const sql = `
    SELECT 
      id,
      psychologist_name as psychologistName,
      email,
      username,
      phone
    FROM 
      clients
    WHERE
      type = 'PSYC'
    ORDER BY
      psychologist_name;`;
    const rows = await manager.query(sql);
    if (rows.length <= 0) return [];
    const psychologistClients: PsychologistClientDto[] = rows.map(function (row: any) {
      return PsychologistMapper.ormToPsychologistClientDto(row);
    });
    return psychologistClients;
  }
}