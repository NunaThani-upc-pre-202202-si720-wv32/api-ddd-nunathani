import { Psychologist } from "./psychologist.entity";

export const PSYCHOLOGIST_REPOSITORY = 'PyschologistRepository';

export interface PsychologistRepository {
  create(psychologist: Psychologist): Promise<Psychologist>;
  update(psychologist: Psychologist): Promise<Psychologist>;
  delete(psychologistId: number): Promise<boolean>;
  getById(id: number): Promise<Psychologist>;
  getByName(name: string): Promise<Psychologist>;
  getByEmail(email: string): Promise<Psychologist>;
}