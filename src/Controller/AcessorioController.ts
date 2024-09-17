import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Acessorio } from "../entity/Acessorio";
import { Veiculo } from "../entity/Veiculo";

const repository = AppDataSource.manager.getRepository(Acessorio)
const veiculoRepository = AppDataSource.manager.getRepository(Veiculo)
export class AcessorioController{
    async create(req: Request, res: Response){
        const created =  repository.create(req.body)
        const final = await repository.save(created)
        return res.json(final)
    }
    async findById(req: Request, res: Response){
        const final = await repository.findOneBy({id: parseInt(req.params.id)})
        return res.json(final)
    }

    async delete(req: Request, res: Response){
        const final = await repository.delete({id: parseInt(req.params.id)})
        return res.json(final)
    }

    async update(req: Request, res: Response){
        const final = await repository.save(req.body)
        return res.json(final)
    }
    async findAll(req: Request, res: Response){
        const final = await repository.find()
        return res.json(final)
    }

    async findRelatedAcessories(req: Request, res: Response){
       const findedVeiculo = await veiculoRepository.find({where: {id: parseInt(req.params.id)}, relations: {acessorio: true}})
       res.json(findedVeiculo.at(0).acessorio)
    }

    async findUnRelatedAcessories(req: Request, res: Response){
        const findedAcessoriesByCar = await repository.query(`SELECT  a.id, a.nome FROM "acessorio" a WHERE a.id 
        NOT IN(SELECT acessorioId FROM "veiculo_acessorio_acessorio" vaa WHERE vaa.veiculoId = ${parseInt(req.params.id)})
        `)
        res.json(findedAcessoriesByCar)
    }
}