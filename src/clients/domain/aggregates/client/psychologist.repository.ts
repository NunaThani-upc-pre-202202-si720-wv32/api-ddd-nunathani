import { Psychologist } from "./psychologist.entity";

export const PSYCHOLOGIST_REPOSITORY = 'PyschologistRepository';

export interface PsychologistRepository {
  create(company: Psychologist): Promise<Psychologist>;
  update(company: Psychologist): Promise<Psychologist>;
  delete(companyId: number): Promise<boolean>;
  getById(id: number): Promise<Psychologist>;
  getByName(name: string): Promise<Psychologist>;
}