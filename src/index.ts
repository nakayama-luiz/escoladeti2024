import { Server } from "http"
import { AppDataSource } from "./data-source"
const express = require('express')
const cors = require('cors')
import { routes } from "./routes"


AppDataSource.initialize().then(async () => {
    const server = express()
    server.use(express.json());

    server.use(cors())
    server.use(routes)

    server.listen(3333)

}).catch(error => console.log(error))
