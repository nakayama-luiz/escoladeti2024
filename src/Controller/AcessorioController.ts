import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Acessorio } from "../entity/Acessorio";

const repository = AppDataSource.manager.getRepository(Acessorio)
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
}