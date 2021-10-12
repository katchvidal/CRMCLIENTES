import React from 'react'
import Layout from '../components/Layout'
import { gql, useQuery as UseQuery } from '@apollo/client'
import Productos from '../components/Productos';
import Link from 'next/link'

const OBTENER_PRODUCTOS = gql`
    query obtenerProductos{
    obtenerProductos{
        nombre
        precio
        existencia
        id
        creado
    }
}
`;





const productos = () => {

    const { data, loading } = UseQuery( OBTENER_PRODUCTOS )
    if( loading ) return ' Loading ... '
    console.log( data );

    return (

        <div>
            <Layout>
            <h1 className="text-3xl p-2 font-extrabold text-gray-900 uppercase">  nuestros PRODUCTOS </h1>
            <Link href='/nuevoproducto'>
            <a className="ml-5 bg-blue-500 px-4 py-2 font-semibold text-white inline-flex items-center space-x-2 rounded"> Nuevo Producto </a>
            </Link>
            {
                data.obtenerProductos.map( producto => (
                   <Productos
                    key={ producto.id }
                    producto = { producto }
                   /> 
                ))
            }
            </Layout>
        </div>

    )
}



export default productos