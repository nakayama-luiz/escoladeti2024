import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Veiculo } from "../entity/Veiculo";

const repository = AppDataSource.manager.getRepository(Veiculo)
export class VeinculoController{
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
    async findAllWithAcessories(req: Request, res: Response){
        const final = await repository.find({relations: {acessorio: true}})
        return res.json(final)
    }

    async addAcessorio(req: Request, res: Response){
        const findedVeiculo = await repository.findOneBy({id: parseInt(req.params.id)})
        try{
            const final = await repository.query(`INSERT INTO veiculo_acessorio_acessorio
        (veiculoId, acessorioId)
        VALUES(${findedVeiculo.id}, ${req.body.acessorioId});`)

        res.json(final)
        
        }catch(e){
            res.send(e)
        }
        res.json()
    }

    async removeAcessorio(req: Request, res: Response){
        const deleteRelation = await repository.query(`DELETE FROM veiculo_acessorio_acessorio
         WHERE veiculoId=${parseInt(req.params.id)} AND acessorioId=${req.body.acessorioId}`)
        res.json(deleteRelation)
    }
}