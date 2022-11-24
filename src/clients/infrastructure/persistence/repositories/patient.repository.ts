import { InjectRepository } from "@nestjs/typeorm";
import { PersonMapper } from "src/clients/application/mappers/patient.mapper";
import { Patient } from "src/clients/domain/aggregates/client/patient.entity";
import { PersonRepository } from "src/clients/domain/aggregates/client/patient.repository";
import { Repository } from "typeorm";
import { PersonEntity } from "../entities/patient.entity";

export class PersonEntityRepository implements PersonRepository  {
  constructor(
    @InjectRepository(PersonEntity)
    private personRepository: Repository<PersonEntity>,
  ) {}

  async create(patient: Patient): Promise<Patient> {
    let personEntity: PersonEntity = PersonMapper.domainToEntity(patient);
    personEntity = await this.personRepository.save(personEntity);
    return PersonMapper.entityToDomain(personEntity);
  }

  async update(patient: Patient): Promise<Patient> {
    let personEntity: PersonEntity = PersonMapper.domainToEntity(patient);
    let personId: number = patient.getId().getValue();
    await this.personRepository.update({ id: personId }, personEntity);
    return patient;
  }

  async delete(personId: number): Promise<boolean> {
    await this.personRepository.delete({ id: personId });
    return true;
  }

  async getById(id: number): Promise<Patient> {
    let personEntity: PersonEntity = await this.personRepository.findOne({ where: { id: id } });
    return PersonMapper.entityToDomain(personEntity);
  }

  async getByDni(dni: string): Promise<Patient> {
    let personEntity: PersonEntity = await this.personRepository.createQueryBuilder().where("dni = :dni", { dni }).getOne();
    return PersonMapper.entityToDomain(personEntity);
  }
}