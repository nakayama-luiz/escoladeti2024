'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Toaster } from "@/components/ui/toaster"
import { toast } from '@/hooks/use-toast'
import { ToastAction } from '@radix-ui/react-toast'

interface acessorios{
    id: number,
    nome: string
}

interface Props {
    modelo: string
    placa: string
    anoFabricacao: number
    id: number
    acessorios: acessorios[]
}

export default function Item({ modelo, placa, anoFabricacao, acessorios, id }: Props) {

    const router = useRouter()

    const handleDelete = async (id: number) => {
        await fetch('http://localhost:3333/' + id, {
            method: 'DELETE'
        })
        toast({
            title: "Exclusão realizada com sucesso!",
            variant: "default",
            action: (
              <ToastAction altText="Goto schedule to undo">O que eu fiz?</ToastAction>
            ),
          })
        router.refresh()
    }
    console.log('chegou foi isso aqui', acessorios)
    return (

        <div className=''>
            <Card>
                <CardHeader>
                    <CardTitle>ID: {id}</CardTitle>
                    <CardDescription>Modelo: {modelo}</CardDescription>
                </CardHeader>
                <CardContent>
                <p>Placa: {placa}</p>
                <p>Ano de Fabricacao: {anoFabricacao}</p>
                <br />
                <h1>Acesório relacionados!</h1>
                <div>
                    {acessorios?.map((e)=> <span> {e.nome} </span>)}
                </div>
                </CardContent>
                <CardFooter>
                <div className='flex justify-end gap-3 mt-4 text-sm'>
                <button className='font-semibold' onClick={() => router.push(`/update-veiculo/${id}`)}>Atualizar</button>
                <button className='font-semibold text-red-500' onClick={() => handleDelete(id)}>Deletar</button>
                <button className='font-semibold text-blue-500' onClick={() => router.push(`/delete-acessorio/${id}`)}>Remover Acessorio</button>
                <button className='font-semibold text-green-500' onClick={() => router.push(`/add-acessorio/${id}`)}>Adicionar Acessorio</button>
            </div>
                </CardFooter>
            </Card>
           
            <Toaster />

            
        </div>
    )
}