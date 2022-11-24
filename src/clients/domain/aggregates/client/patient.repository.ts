import { Patient } from "./patient.entity";

export const PERSON_REPOSITORY = 'PersonRepository';

export interface PersonRepository {
  create(patient: Patient): Promise<Patient>;
  update(patient: Patient): Promise<Patient>;
  delete(personId: number): Promise<boolean>;
  getById(id: number): Promise<Patient>;
  getByDni(dni: string): Promise<Patient>;
}