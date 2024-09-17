'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

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

        router.refresh()
    }

    return (
        <div className='border-2 border-black p-3 rounded-md'>
            <h2 className='mb-2'>ID: {id}</h2>
            <h1 className='text-xl font-semibold'>{modelo}</h1>
            <p>{placa}</p>
            <p>{anoFabricacao}</p>

            <div className='flex justify-end gap-3 mt-4 text-sm'>
                <button className='font-semibold' onClick={() => router.push(`/update/${id}`)}>Update</button>
                <button className='font-semibold text-red-500' onClick={() => handleDelete(id)}>Delete</button>
            </div>
        </div>
    )
}