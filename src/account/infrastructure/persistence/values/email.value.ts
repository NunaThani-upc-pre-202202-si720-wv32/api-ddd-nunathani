import { Column, Unique } from 'typeorm';

export class EmailValue {
  @Column('varchar', { name: 'email', length: 50, nullable: false })
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): EmailValue {
    return new EmailValue(value);
  }
}