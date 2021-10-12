import React from 'react'
import { useQuery as UseQuery, gql  } from "@apollo/client";
import { useRouter as UseRouter } from 'next/router'
import Layout from "../components/Layout";
import Card from '../components/Card';
import Link from 'next/link'

const OBTENER_CLIENTES = gql`
query obtenerClientes{
    obtenerClientes{
        id
        nombre
        apellido
        empresa
        vendedor
        telefono
        email
        estado
    }
}
`;

const index = () => {

  const router = UseRouter()
  const { data, loading } = UseQuery( OBTENER_CLIENTES )
  
  if( loading ){
    return ' Loading ... '
  }

  if( !data.obtenerClientes ){
    return router.replace('/login')
  }

  console.log( data );


  return (
    <>
      <Layout>
        <h1 className="text-3xl text-gray-800 font-bold p-2"> CLIENTES </h1>
        <Link href='/nuevocliente'>
            <a className="ml-5 bg-blue-500 px-4 py-2 font-semibold text-white inline-flex items-center space-x-2 rounded">Nuevo Cliente </a>
        </Link>
        { data.obtenerClientes.map( cliente => 
          <Card 
            key={ cliente.id  } 
            cliente = { cliente }
          />
          )}
      </Layout>
    </>
  )
}

export default index;