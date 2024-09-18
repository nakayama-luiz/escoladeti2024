import { Entity, PrimaryGeneratedColumn, Column, Collection, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import { Acessorio } from "./Acessorio";

@Entity('veiculo')
export class Veiculo {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    modelo: string

    @Column({ type: "int"})
    anoFabricacao: number

    @Column({precision: 7})
    placa: string;

    @ManyToMany(() => Acessorio)
    @JoinTable()
    acessorio: Acessorio[]
}
