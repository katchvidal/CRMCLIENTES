import React from 'react'
import imgphone from '../public/Imagenes/iphone.jpeg'
import Image from 'next/image'
import { gql, useMutation as UseMutation } from '@apollo/client'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'



const ELIMINAR_PRODUCTO = gql`
mutation eliminarProducto($id: ID!){
    eliminarProducto(id: $id)
}
`;

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


const Productos = ({ producto }) => {
    const router = useRouter()
    const { nombre, precio, existencia, id  } = producto

    const [ eliminarProducto ] =UseMutation( ELIMINAR_PRODUCTO, {
        update( cache ){
            const { obtenerProductos } = cache.readQuery({ query : OBTENER_PRODUCTOS });
            cache.writeQuery({
                query: OBTENER_PRODUCTOS,
                data: {
                    obtenerProductos: obtenerProductos.filter( productoactual => productoactual.id != id )
                }
            })
        }
    } )

    const handleEliminar = async() => {
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
                  await eliminarProducto({
                    variables : {
                      id
                    }
                  })
                  Swal.fire(
                    'Eliminado!',
                    'El Producto Ha Sido Eliminado.',
                    'success'
                  )
              } catch (error) {
                console.log( error );
              }
      
            }
          })
    }

    const handleEditar = ( ) => {
        router.push({
            pathname: '/editarproducto/[id]',
            query: { id }
          })
    }

    return (

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 mt-12 mb-12">
        <article>
            <section className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
                <article className="bg-white group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200">
                    <div className="relative w-full h-80 md:h-64 lg:h-44">
                        <Image className="w-full h-full object-center object-cover" 
                            src={ imgphone }
                            alt={ nombre } />
                    </div>
                    <div className="px-3 py-4 mt-5">
                        <h3 className="text-sm text-gray-500 pb-2">
                            <a className="bg-indigo-600 py-1 px-2 text-white rounded-lg" href="#">
                                
                               Producto: {nombre}
                            </a>
                        </h3>
                        <p className="text-base font-semibold text-gray-900 group-hover:text-indigo-600"> Precio: { precio} </p>
                        <p className="text-base font-semibold text-gray-900 group-hover:text-indigo-600"> Existencia: { existencia } </p>
                        <button
                            type="button"
                            onClick={ handleEliminar }
                            className="border border-red-500 text-red-500 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-red-600 focus:outline-none focus:shadow-outline"
                            >
                            Eliminar  
                        </button>
                        <button
                            type="button"
                            onClick={ handleEditar }
                            className="border border-yellow-500 text-yellow-500 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-yellow-600 focus:outline-none focus:shadow-outline"
                            >
                            Editar  
                        </button>
                    </div>
                </article>
            </section>
        </article>
    </section>

    )
}

export default Productos
