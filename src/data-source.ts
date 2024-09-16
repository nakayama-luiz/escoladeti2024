import "reflect-metadata"
import { DataSource } from "typeorm"
import { Veiculo } from "./entity/Veiculo"
import { Acessorio } from "./entity/Acessorio"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "banco.sqlite3",
    synchronize: true,
    logging: false,
    entities: [Veiculo, Acessorio],
    migrations: [],
    subscribers: [],
})
