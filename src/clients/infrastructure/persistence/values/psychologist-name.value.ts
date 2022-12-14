import { Column } from 'typeorm';

export class PsychologistNameValue {
  @Column('varchar', { name: 'psychologist_name', length: 150, nullable: true })
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(name: string): PsychologistNameValue {
    return new PsychologistNameValue(name);
  }
}