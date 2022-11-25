import { InjectRepository } from "@nestjs/typeorm";
import { Psychologist } from "src/account/domain/aggregates/client/psychologist.entity";
import { PsychologistRepository } from "src/account/domain/aggregates/client/psychologist.repository";
import { Repository } from "typeorm";
import { PsychologistEntity } from "../entities/psychologist.entity";
import { PsychologistMapper } from '../../../application/mappers/psychologist.mapper';

export class PsychologistEntityRepository implements PsychologistRepository {
  constructor(
    @InjectRepository(PsychologistEntity)
    private psychologistRepository: Repository<PsychologistEntity>,
  ) { }

  async create(psychologist: Psychologist): Promise<Psychologist> {
    let psychologistEntity: PsychologistEntity = PsychologistMapper.domainToEntity(psychologist);
    psychologistEntity = await this.psychologistRepository.save(psychologistEntity);
    return PsychologistMapper.entityToDomain(psychologistEntity);
  }

  async update(psychologist: Psychologist): Promise<Psychologist> {
    let psychologistEntity: PsychologistEntity = PsychologistMapper.domainToEntity(psychologist);
    let psychologistId: number = psychologist.getId().getValue();
    await this.psychologistRepository.update({ id: psychologistId }, psychologistEntity);
    return psychologist;
  }

  async delete(psychologistId: number): Promise<boolean> {
    await this.psychologistRepository.delete({ id: psychologistId });
    return true;
  }

  async getById(id: number): Promise<Psychologist> {
    let psychologistEntity: PsychologistEntity = await this.psychologistRepository.findOne({ where: { id: id } });
    return PsychologistMapper.entityToDomain(psychologistEntity);
  }

  async getByName(name: string): Promise<Psychologist> {
    let psychologistEntity: PsychologistEntity = await this.psychologistRepository.createQueryBuilder('psychologist')
    .where("psychologist.psychologistName.value = :psychologistName", { psychologistName: name }).getOne();
    return PsychologistMapper.entityToDomain(psychologistEntity);
  }

  async getByEmail(email: string): Promise<Psychologist> {
    let psychologistEntity: PsychologistEntity = await this.psychologistRepository.createQueryBuilder()
    .where("email = :email", { email }).getOne();
    return PsychologistMapper.entityToDomain(psychologistEntity);
  }

  async getByUsername(username: string): Promise<Psychologist> {
    let psychologistEntity: PsychologistEntity = await this.psychologistRepository.createQueryBuilder()
    .where("username = :username", { username }).getOne();
    return PsychologistMapper.entityToDomain(psychologistEntity);
  }

  // async getByRuc(ruc: string): Promise<Psychologist> {
  //   let psychologistEntity: PsychologistEntity = await this.psychologistRepository.createQueryBuilder().where("ruc = :ruc", { ruc }).getOne();
  //   return PsychologistMapper.entityToDomain(psychologistEntity);
  // }
}