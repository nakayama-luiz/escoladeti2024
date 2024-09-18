"use client"

import { response } from 'express';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface tudo{
    nome: string
    id: number
}

const Page = ({ params }: { params: { id: number } }) => {
    const [response, setResponse] = useState([]);

    const id = params.id
    const [nome, setnome] = useState('')
    const [resposta, setResposta] = useState([])
    const [aceId, setAceId] = useState(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        setIsLoading(true)

        const forms = {
            nome: nome,
            id: Number(id)
        }

       
        console.log(forms)

        try{
            const data = await fetch('http://localhost:3333/acessorio', {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(forms)
            })
        }catch(e){
            console.log(e)
        }

        setIsLoading(false)

        router.push('/')
    }

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const response = await fetch('http://localhost:3333/acessorio/' + id, )
        const data = await response.json()
        
        setnome(data.nome)
        
    }
    useEffect(() => {
        getData()
    }, [])

    const getDataRelated = async () => {
        const response = await fetch('http://localhost:3333/acessorio/findRelatedAcessories/' + id, )
        const data = await response.json()
        
        setResposta(data)
    }
    useEffect(() => {
        getDataRelated()
    }, [])

    console.log('REsolve-se: ', resposta)

    return (
        <form className='w-[500px] mx-auto pt-20 flex flex-col gap-2' onSubmit={handleSubmit}>

            <input style={{color: 'black'}} type="text"  value={nome} onChange={(e) => setnome(e.target.value)} className='w-full border p-2 rounded-md' />
            <button disabled={isLoading}>{isLoading ? 'Loading ...' : 'Update'}</button>
        </form>
    )
}

export default Page