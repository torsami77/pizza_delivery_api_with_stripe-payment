import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty } from "sequelize-typescript";

interface UserInterface {
    id?: number | null,
    first_name: string,
    email: string,
    address: string,
    password: string,
}

@Table(
    {
        tableName: "user",
        timestamps: true
    }
)


export default class User extends Model implements UserInterface {
    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number;

    @AllowNull(false)
    @NotEmpty
    @Column
    first_name!: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    email!: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    address!: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    password!: string;
}