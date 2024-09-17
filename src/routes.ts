import { Router } from "express";
import { VeinculoController } from "./Controller/VeiculoController";
import { AcessorioController } from "./Controller/AcessorioController";

export const routes = Router()

routes.post('/create', new VeinculoController().create)
routes.put('/', new VeinculoController().update)
routes.get('/:id', new VeinculoController().findById)
routes.get('/encontrar/findAll', new VeinculoController().findAll)
routes.get('/encontrar/findAllWithAcessories', new VeinculoController().findAllWithAcessories)
routes.delete('/:id', new VeinculoController().delete)
routes.put('/addAcessorio/:id', new VeinculoController().addAcessorio)
routes.delete('/removeAcessorio/:id', new VeinculoController().removeAcessorio)

routes.post('/acessorio/create', new AcessorioController().create)
routes.put('/acessorio', new AcessorioController().update)
routes.get('/acessorio/:id', new AcessorioController().findById)
routes.get('/acessorio/encontrar/findAll', new AcessorioController().findAll)
routes.delete('/acessorio/:id', new AcessorioController().delete)
routes.get('/acessorio/findRelatedAcessories/:id',new AcessorioController().findRelatedAcessories)
routes.get('/acessorio/findUnRelatedAcessories/:id',new AcessorioController().findUnRelatedAcessories)
