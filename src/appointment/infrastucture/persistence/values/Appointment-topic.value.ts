import { Column } from "typeorm";

export class AppointmentTopicValue {
    @Column("varchar", { name: "topic", length: 50, nullable: true })
    public value: string;

    private constructor(value: string) {
        this.value = value;
    }

    public static from(value: string): AppointmentTopicValue {
        return new AppointmentTopicValue(value);
    }
}