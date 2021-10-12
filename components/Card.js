import React from 'react'
import Image from 'next/image'
import profilePic from '../public/Imagenes/unknow.jpeg'
import { gql, useMutation as UseMutation  } from '@apollo/client'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'


const ELIMINAR_CLIENTE = gql`
mutation eliminarCliente($id : ID!){
    eliminarCliente(id : $id )
}
`;

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



export const Card = ( {cliente} ) => {

  const router = useRouter()

  const [ eliminarCliente ] = UseMutation( ELIMINAR_CLIENTE, {
    update( cache ){
      const { obtenerClientes } = cache.readQuery({ query : OBTENER_CLIENTES });
      cache.writeQuery({
        query : OBTENER_CLIENTES,
        data: {
          obtenerClientes: obtenerClientes.map( ClienteActual  => [ ...obtenerClientes, ClienteActual] )
        }
      })
    }
  } )

  const handleEliminar = ( id  ) => {
    Swal.fire({
      title: '¿ Estas Seguro ?',
      text: "No podremos revertir esta Accion ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminalo!'
    }).then(async(result) => {
        if (result.isConfirmed) {
          try {
            await eliminarCliente({
              variables : {
                id
              }
            })
            Swal.fire(
              'Eliminado!',
              'El Cliente Ha Sido Eliminado.',
              'success'
            )
        } catch (error) {
          console.log( error );
        }

      }
    })
  }

  const handleEditar = ( id ) => {
    router.push({
      pathname: '/editarcliente/[id]',
      query: { id }
    })
  }

  return (

      <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
      <div className="flex justify-center md:justify-end -mt-16">
        <Image className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500" 
        src={ profilePic }
        alt={ cliente.nombre } />
      </div>
      <div>
        <h2 className="text-gray-800 text-3xl font-semibold"> { cliente.nombre } { cliente.apellido } </h2>
        <p className="mt-2 text-gray-600"> { cliente.empresa } </p>
        <p className="mt-2 text-gray-600"> { cliente.telefono } </p>
        <p className="mt-2 text-gray-600"> { cliente.email } </p>
      </div>
      <button
          type="button"
          onClick={ () =>  handleEliminar( cliente.id  ) }
          className="border border-red-500 text-red-500 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-red-600 focus:outline-none focus:shadow-outline"
        >
          Eliminar
        </button>
      
        <button
          type="button"
          onClick={ () =>  handleEditar(cliente.id ) }
          className="border border-yellow-500 text-yellow-500 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-yellow-600 focus:outline-none focus:shadow-outline"
        >
          Editar 
        </button>
    </div>

  )
}

export default Card;