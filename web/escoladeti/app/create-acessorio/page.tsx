"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Page = () => {
    const [nome, setnome] = useState('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        
        setIsLoading(true)

        const forms = {
            nome: nome
        }

        console.log(forms)

        try{
            const data = await fetch('http://localhost:3333/acessorio/create', {
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
            <label htmlFor="">Nome do Acessório!</label>
            <input style={{color: 'black'}} required type="text"  value={nome} onChange={(e) => setnome(e.target.value)} className='w-full border p-2 rounded-md' />
            <button disabled={isLoading}>{isLoading ? 'Loading ...' : 'Submit'}</button>
        </form>
    )
}

export default Page