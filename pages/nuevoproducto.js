import { Formik } from 'formik'
import React, { useState as UseState } from 'react'
import Layout from '../components/Layout'
import * as Yup from 'yup'
import Swal from 'sweetalert2';
import router from "next/router"
import { gql, useMutation as UseMutation  } from '@apollo/client'

const NUEVO_PRODUCTO = gql`
mutation nuevoProducto($input: ProductoInput ){
    nuevoProducto(input: $input ) {
        id
        nombre
        precio
        existencia
        creado
    }
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




const nuevoproducto = () => {

    const [ nuevoProducto ] = UseMutation( NUEVO_PRODUCTO, {
        update( cache, { data : nuevoProducto }){
            const { obtenerProductos } = cache.readQuery({ query : OBTENER_PRODUCTOS });
            cache.writeQuery({
                query: OBTENER_PRODUCTOS,
                data : {
                    obtenerProductos : [...obtenerProductos, nuevoProducto ]
                }
            })
        }
    })

    const [mensaje, saveMensaje ] = UseState( null )

    const ShowMessage = () => {
        mensaje;
    }

    return (
        <>
            <Layout>
                { ShowMessage() }
            <h1 className="text-center text-black text-4xl font-bold mt-20"> REGISTRAR NUEVO PRODUCTO  </h1>
                    <div className=" flex justify-center mt-5">
                    <div className=" w-full max-w-md">

                    <Formik
                            initialValues={{ nombre: '', precio: '', existencia: '' }}
                            validationSchema ={ 
                                Yup.object({
                                    nombre: Yup.string()
                                                        .required('El Nombre es Requerido'),
                                    precio: Yup.number()
                                                        .positive('No puede ser un numero Negativo')
                                                        .required('El Precio es Requerido'),
                                    existencia: Yup.number()
                                                        .required('La existencia es Requerido')
                                                        
                                })
                            }
                            onSubmit={ async values  => {
                                const { nombre, existencia, precio } = values
                                try {
                                    await nuevoProducto({
                                        variables : {
                                            input : {
                                                nombre,
                                                existencia,
                                                precio
                                            }
                                        }
                                    })
                                    saveMensaje( 
                                        Swal.fire({
                                            position: 'top-end',
                                            icon: 'success',
                                            title: `Producto Registrado: ${ nombre }` ,
                                            showConfirmButton: false,
                                            timer: 2000
                                        }) 
                                    );
                                    setTimeout(() => {
                                        saveMensaje( null )
                                        router.push('/productos')
                                    }, 2500) 
                                } catch (error) {
                                    saveMensaje(
                                        Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: error.message,
                                        footer: 'Intentelo de Nuevo Por Favor '
                                        })                
                                )
                                setTimeout(() => {
                                    saveMensaje( null)
                                }, 2500)
                                }
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
                                placeholder="Nombre Producto "
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
                                <label className="block text-grey-700 text-sm font-bold mb-2 mt-4" htmlFor="precio"> Precio </label>
                                <input 
                                className=" shadow appearance-none border rounded w-full py-2 px-2 text-gray-700" 
                                id="precio"
                                type="number"
                                placeholder="Precio Producto "
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
                                <label className="block text-grey-700 text-sm font-bold mb-2 mt-4" htmlFor="existencia"> Existencia </label>
                                <input 
                                className=" shadow appearance-none border rounded w-full py-2 px-2 text-gray-700" 
                                id="existencia"
                                type="number"
                                placeholder="Existencia Producto "
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
                            value="Registrar Nuevo Producto "
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

export default nuevoproducto
