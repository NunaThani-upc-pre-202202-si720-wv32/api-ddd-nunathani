import { Column } from "typeorm";

export class AppointmentDateValue {
    @Column("datetime", { name: "date", nullable: true })
    public value: Date;

    private constructor(value: Date) {
        this.value = value;
    }

    public static from(date: Date): AppointmentDateValue {
        return new AppointmentDateValue(date);
    }
}