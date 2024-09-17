import { Entity, PrimaryGeneratedColumn, Column, Collection, OneToMany } from "typeorm"
import { Veiculo } from "./Veiculo"

@Entity('acessorio')
export class Acessorio {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    // @OneToMany(() => Veiculo, (veiculo) => veiculo.acessorio)
    // veiculo: Veiculo[]
}
