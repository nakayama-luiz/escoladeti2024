"use client"

import e, { response } from 'express';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface comprs{
    id: number
    nome: string
}
const Page = ({ params }: { params: { id: number } }) => {
    const [resposta, setResposta] = useState<comprs[]>([])
    const [value, setValue] = useState<string|undefined>('');

    const getDataRelated = async () => {
        const response = await fetch('http://localhost:3333/acessorio/findRelatedAcessories/' + id)
        const data = await response.json()

        setResposta(data)
    }
    useEffect(() => {
        getDataRelated()
    }, [])

    
    const lista  = resposta?.map(e=> e.id)


    const id = params.id
    const [nome, setnome] = useState('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        setIsLoading(true)
        console.log('antes!', value)
        let  forms = {
            acessorioId: Number(value),
        }
        let alternative: string | undefined;


        if(value===''){
            console.log('entrei! ', resposta?.at(0)?.id.toString())
            
            
            setValue(resposta.at(0)?.id.toString())
            alternative = resposta.at(0)?.id.toString()
        }
        if(Number(value)==0){
            console.log('errado')
            setValue(resposta.at(0)?.id.toString())
            forms.acessorioId = Number(alternative)
        }
        

        console.log('com muito esforço: ', forms.acessorioId)
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

        setnome(data.modelo)

    }
    useEffect(() => {
        getData()
    }, [])

    

    return (
        <form className='w-[500px] mx-auto pt-20 flex flex-col gap-2' onSubmit={handleSubmit}>
            <h1>Selecione o acessorio para remover do {nome}!</h1>
            <select style={{color: 'black'}} name="poggers" id="haha" value={value} onChange={(e)=>{setValue((e.target.value))}}>
                {resposta?.map((e: any) => <option value={e.id}>{e.nome}</option>)}
            </select>
            <button disabled={isLoading}>{isLoading ? 'Loading ...' : 'Remover relação'}</button>
        </form>
    )
}

export default Page