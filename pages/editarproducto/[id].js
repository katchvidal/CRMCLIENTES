import React from "react"
import Layout from "../../components/Layout"
import { Formik } from "formik"
import * as Yup from 'yup'
import Swal from 'sweetalert2';
import { useRouter } from "next/router"
import { gql, useMutation as UseMutation, useQuery as UseQuery  } from '@apollo/client'

const OBTENER_PRODUCTO=gql`
query obtenerProducto($id : ID! ){
    obtenerProducto(id : $id ){
        nombre
        precio
        existencia
        id
    }
}
`

const ACTUALIZAR_PRODUCTO =gql`
mutation editarProducto($id : ID!, $input : ProductoInput){
    editarProducto(id : $id, input : $input ){
        nombre
        precio
        existencia
        id 
        creado
    }
}
`


const EditarProducto = () => {

    const router = useRouter()
    const { query: { id } } = router
    
    const { data, loading } = UseQuery( OBTENER_PRODUCTO, {
        variables : {
            id
        }
    } )
    const [ editarProducto ]=UseMutation( ACTUALIZAR_PRODUCTO )

    if( loading ) return 'Loading...'

    const { obtenerProducto } = data
    
    const handleActualizar = async( values ) => {

        const { nombre, precio, existencia } = values;
        try {
            const { data } = await editarProducto({
                variables : {
                    id,
                    input : {
                        nombre,
                        precio,
                        existencia
                    }
                }
            })
            console.log( data );
            Swal.fire(
                {
                  position: 'top-end',
                  icon: 'success',
                  title: 'Producto Actualizado',
                  showConfirmButton: false,
                  timer: 1800
                }

              )
            setTimeout(()=>{
                router.push('/productos')
            }, 1800 )
        } catch (error) {
            console.log( error );
        }
    }   

 
    return (
        <>
            <Layout>
            <h1 className="text-center text-black text-4xl font-bold mt-20"> EDITAR PRODUCTO  </h1>
                    <div className=" flex justify-center mt-5">
                    <div className=" w-full max-w-md">

                    <Formik
                            enableReinitialize
                            initialValues={ obtenerProducto }
                            validationSchema ={ 
                                Yup.object({

                                    nombre: Yup.string()
                                                        .required('El Password es Requerido'),
                                    precio: Yup.number()
                                                        .required('El Precio es Requerido'),
                                    existencia: Yup.number()
                                                        .required('La Existencia es Requerido')
                                                        
                                })
                            }
                            onSubmit={ values => {
                                handleActualizar( values )   
                            }}
                    >
                    {({

                    values,

                    errors,

                    touched,

                    handleChange,

                    handleBlur,

                    handleSubmit

                        }) => (
                        <form className=" bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={ handleSubmit }>
                            <div>
                                <label className="block text-grey-700 text-sm font-bold mb-2 " htmlFor="nombre"> Nombre </label>
                                <input 
                                className=" shadow appearance-none border rounded w-full py-2 px-2 text-gray-700" 
                                id="nombre"
                                type="text"
                                placeholder="NOMBRE PRODUCTO "
                                value={ values.nombre }
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                                ></input>
                            </div>

                            {

                                errors.nombre && touched.nombre ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold"> Error </p>
                                        <p> { errors.nombre } </p> 
                                    </div>
                                ) : null 

                            }
                            <div>
                                <label className="block text-grey-700 text-sm font-bold mb-2 " htmlFor="precio"> PRECIO </label>
                                <input 
                                className=" shadow appearance-none border rounded w-full py-2 px-2 text-gray-700" 
                                id="precio"
                                type="number"
                                placeholder="PRECIO PRODUCTO "
                                value={ values.precio }
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                                ></input>
                            </div>

                            {

                                errors.precio && touched.precio ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold"> Error </p>
                                        <p> { errors.precio } </p> 
                                    </div>
                                ) : null 

                            }
                            <div>
                                <label className="block text-grey-700 text-sm font-bold mb-2 " htmlFor="existencia"> EXISTENCIA </label>
                                <input 
                                className=" shadow appearance-none border rounded w-full py-2 px-2 text-gray-700" 
                                id="existencia"
                                type="number"
                                placeholder="EXISTENCIA PRODUCTO "
                                value={ values.existencia }
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                                ></input>
                            </div>

                            {

                                errors.existencia && touched.existencia ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold"> Error </p>
                                        <p> { errors.existencia } </p> 
                                    </div>
                                ) : null 

                            }


                            <input 
                            type="submit" 
                            className="bg-gray-700 w-full text-white mt-5 p-2 uppercase hover:bg-gray-900 cursor-pointer block"
                            value="Editar Producto"
                            ></input>

                        </form>
                )}
                </Formik>
                
                    </div>

                    </div>
            </Layout>
        </>
    )
}

export default EditarProducto;


