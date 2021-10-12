import React from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'

const pedidos = () => {
    return (

        <div>
            <Layout>
            <h1 className="text-3xl text-gray-800 font-bold p-2"> PEDIDOS </h1>
            <Link href='/nuevopedido'>
            <a className="ml-5 mb-4 bg-blue-500 px-4 py-2 font-semibold text-white inline-flex items-center space-x-2 rounded">Nuevo Pedido </a>
            </Link>

            </Layout>
        </div>

    )
}



export default pedidos
