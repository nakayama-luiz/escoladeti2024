"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Page = () => {
    const [modelo, setModelo] = useState('')
    const [placa, setMarca] = useState('')
    const [anoFabricacao, setanoFabricacao] = useState(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        
        setIsLoading(true)

        const forms = {
            anoFabricacao: anoFabricacao, 
            modelo: modelo,
            placa: placa
        }

        console.log(forms)

        try{
            const data = await fetch('http://localhost:3333/create', {
                method: 'POST', 
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

    return (
        <form className='w-[500px] mx-auto pt-20 flex flex-col gap-2' onSubmit={handleSubmit}>
            <input required type="text" placeholder='Input your modelo' value={modelo} onChange={(e) => setModelo(e.target.value)} className='w-full border p-2 rounded-md' />
            <input required  type='text' value={placa} onChange={(e) => setMarca(e.target.value)} className='w-full border p-2 rounded-md' />
            <label htmlFor="">Ano</label>
            <input required type="number" name="ano" id="ano" value={anoFabricacao} onChange={(e) => setanoFabricacao(parseInt(e.target.value))}/>
            <button disabled={isLoading}>{isLoading ? 'Loading ...' : 'Submit'}</button>
        </form>
    )
}

export default Page