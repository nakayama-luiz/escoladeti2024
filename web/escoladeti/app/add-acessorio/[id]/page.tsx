"use client"

import { response } from 'express';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = ({ params }: { params: { id: number } }) => {
    const [resposta, setResposta] = useState([])
    const [value, setValue] = useState('');

    const id = params.id
    const [nome, setnome] = useState('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        setIsLoading(true)

        const forms = {
            acessorioId: Number(value),
        }


        console.log(forms)

        try {
            const data = await fetch('http://localhost:3333/removeAcessorio/'+id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(forms)
            })
        } catch (e) {
            console.log(e)
        }

        setIsLoading(false)

        router.push('/')
    }

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const response = await fetch('http://localhost:3333/' + id,)
        const data = await response.json()

        setnome(data.nome)

    }
    useEffect(() => {
        getData()
    }, [])

    const getDataRelated = async () => {
        const response = await fetch('http://localhost:3333/acessorio/findRelatedAcessories/' + id)
        const data = await response.json()

        setResposta(data)
    }
    useEffect(() => {
        getDataRelated()
    }, [])


    return (
        <form className='w-[500px] mx-auto pt-20 flex flex-col gap-2' onSubmit={handleSubmit}>
            <h1>Selecione o acessorio para remover do veículo!</h1>
            <select name="poggers" id="haha" value={value} onChange={(e)=>{setValue(e.target.value)}}>
                {resposta?.map((e: any) => <option value={e.id}   >{e.nome}</option>)}
            </select>
            {/* <input type="text" value={nome} onChange={(e) => setnome(e.target.value)} className='w-full border p-2 rounded-md' /> */}
            <button disabled={isLoading}>{isLoading ? 'Loading ...' : 'Remover relação'}</button>
        </form>
    )
}

export default Page