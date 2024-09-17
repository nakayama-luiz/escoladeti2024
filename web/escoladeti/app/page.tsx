import Link from 'next/link'
import React from 'react'
import Item from './item'

const getVeiculos = async () => {
    const res = await fetch('http://localhost:3333/encontrar/findAll', { next: { revalidate: 0 } })

    const json = await res.json()
    return json
}

const Page = async () => {

    const veiculos = await getVeiculos()

    return (
        <div className='w-[1200px] mx-auto py-20'>
            <Link href={"/create-veiculo"} className='px-3 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-md text-white'>Criar veiculo</Link>

            <div className='grid grid-cols-3 gap-5 mt-8'>
                {veiculos?.map((veiculos: any, i: number) => (
                    <Item anoFabricacao={veiculos.anoFabricacao} placa={veiculos.placa} modelo={veiculos.modelo} id={veiculos.id} />
                ))}
            </div>
        </div>
    )
}

export default Page