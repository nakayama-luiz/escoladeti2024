'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Toaster } from "@/components/ui/toaster"
import { toast } from '@/hooks/use-toast'
import { ToastAction } from '@radix-ui/react-toast'

interface Props {
    modelo: string
    placa: string
    anoFabricacao: number
    id: number
}

export default function Item({ modelo, placa, anoFabricacao, id }: Props) {

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
                </CardContent>
                <CardFooter>
                <div className='flex justify-end gap-3 mt-4 text-sm'>
                <button className='font-semibold' onClick={() => router.push(`/update-veiculo/${id}`)}>Atualizar</button>
                <button className='font-semibold text-red-500' onClick={() => handleDelete(id)}>Deletar</button>
            </div>
                </CardFooter>
            </Card>
           
            <Toaster />

            
        </div>
    )
}