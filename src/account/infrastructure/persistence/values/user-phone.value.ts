import { Column } from "typeorm";

export class UserPhoneValue {
    @Column("varchar", { name: "phone", length: 9, nullable: false })
    value: string;

    private constructor(value: string) {
        this.value = value;
    }

    public static from(value: string): UserPhoneValue {
        return new UserPhoneValue(value);
    }
}
