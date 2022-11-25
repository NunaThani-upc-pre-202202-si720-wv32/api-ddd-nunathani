import { Column } from "typeorm";

export class UsernameValue {
    @Column("varchar", { name: "username", length: 50, nullable: false })
    value: string;

    private constructor(value: string) {
        this.value = value;
    }

    public static from(value: string): UsernameValue {
        return new UsernameValue(value);
    }
}