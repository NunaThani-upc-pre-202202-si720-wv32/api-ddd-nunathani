import { Patient } from "./patient.entity";

export const PERSON_REPOSITORY = 'PatientRepository';

export interface PatientRepository {
  create(patient: Patient): Promise<Patient>;
  update(patient: Patient): Promise<Patient>;
  delete(patientId: number): Promise<boolean>;
  getById(id: number): Promise<Patient>;
  getByDni(dni: string): Promise<Patient>;
}