"use client"

import { response } from 'express';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = ({ params }: { params: { id: number } }) => {
    const [response, setResponse] = useState([]);

    const id = params.id
    const [modelo, setModelo] = useState('')
    const [placa, setPlaca] = useState('')
    const [anoFabricacao, setAnoFabricacao] = useState(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        setIsLoading(true)

        const forms = {
            anoFabricacao: anoFabricacao, 
            modelo: modelo,
            placa: placa,
            id: Number(id)
        }

       
        console.log(forms)

        try{
            const data = await fetch('http://localhost:3333/', {
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
        const response = await fetch('http://localhost:3333/' + id, )
        const data = await response.json()
        
        console.log(data.anoFabricacao)
        setAnoFabricacao(data.anoFabricacao)
        setModelo(data.modelo)
        setPlaca(data.placa)
        
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <form className='w-[500px] mx-auto pt-20 flex flex-col gap-2' onSubmit={handleSubmit}>
            <input type="text"  value={modelo} onChange={(e) => setModelo(e.target.value)} className='w-full border p-2 rounded-md' />
            <textarea rows={10}  value={placa} onChange={(e) => setPlaca(e.target.value)} className='w-full border p-2 rounded-md' />
            <input type="number" name="ano" id="ano" value={anoFabricacao} onChange={(e) => setAnoFabricacao(parseInt(e.target.value))}/>
            <button disabled={isLoading}>{isLoading ? 'Loading ...' : 'Update'}</button>
        </form>
    )
}

export default Page