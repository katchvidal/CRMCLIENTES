import React, { useState as UseState }  from "react"
import Layout from "../components/Layout"
import { Formik } from "formik"
import * as Yup from 'yup'
import Swal from 'sweetalert2';
import router from "next/router"
import { gql, useMutation as UseMutation  } from '@apollo/client'


const NUEVO_CLIENTE = gql `
    mutation nuevoCliente($input: ClienteInput!){
        nuevoCliente(input: $input){
            nombre
            apellido
            email
            empresa
            vendedor
            id
            telefono
        }
    }
`
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

const nuevocliente = () => {

    const [ nuevoCliente ] = UseMutation( NUEVO_CLIENTE, {
        update(cache, { data: { nuevoCliente } }) {

            const { obtenerClientes } = cache.readQuery({ query : OBTENER_CLIENTES });

            cache.writeQuery({
                query : OBTENER_CLIENTES,
                data: {
                    obtenerClientes : [...obtenerClientes, nuevoCliente ] 
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
            <h1 className="text-center text-black text-4xl font-bold mt-20"> REGISTRAR NUEVO CLIENTE  </h1>
                    <div className=" flex justify-center mt-5">
                    <div className=" w-full max-w-md">

                    <Formik
                            initialValues={{ nombre: '', apellido: '', empresa: '', email: '', telefono: '' }}
                            validationSchema ={ 
                                Yup.object({
                                    email: Yup.string()
                                                        .required('El Email es Obligatorio').email('El email no es Valido'),
                                    nombre: Yup.string()
                                                        .required('El Password es Requerido'),
                                    apellido: Yup.string()
                                                        .required('El Password es Requerido'),
                                    empresa: Yup.string()
                                                        .required('El Password es Requerido')
                                                        
                                })
                            }
                            onSubmit={ async values  => {
                                const { nombre, apellido, empresa, email, telefono } = values
                                try {
                                    const { data } = await nuevoCliente({
                                        variables : {
                                            input : {
                                                email,
                                                nombre,
                                                apellido,
                                                empresa,
                                                telefono
                                            }
                                        }
                                    })
                                    saveMensaje( 
                                        Swal.fire({
                                            position: 'top-end',
                                            icon: 'success',
                                            title: `Cliente Registrado: ${ nombre } ${apellido }` ,
                                            showConfirmButton: false,
                                            timer: 2000
                                        }) 
                                    );
                                    setTimeout(() => {
                                        saveMensaje( null )
                                        router.push('/')
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
                                placeholder="Nombre Cliente "
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
                                <label className="block text-grey-700 text-sm font-bold mb-2 mt-4" htmlFor="apellido"> Apellido </label>
                                <input 
                                className=" shadow appearance-none border rounded w-full py-2 px-2 text-gray-700" 
                                id="apellido"
                                type="text"
                                placeholder="Apellido Cliente "
                                value={ values.apellido }
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                                ></input>
                            </div>

                            {

                                errors.apellido && touched.apellido ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold"> Error </p>
                                        <p> { errors.apellido } </p> 
                                    </div>
                                ) : null 

                            }

                            <div>
                                <label className="block text-grey-700 text-sm font-bold mb-2 mt-4" htmlFor="email"> Email </label>
                                <input 
                                className=" shadow appearance-none border rounded w-full py-2 px-2 text-gray-700" 
                                id="email"
                                type="email"
                                placeholder="Email Cliente "
                                value={ values.email }
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                                ></input>
                            </div>

                            {

                                errors.email && touched.email ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold"> Error </p>
                                        <p> { errors.email } </p> 
                                    </div>
                                ) : null 

                            }

                            <div>
                                <label className="block text-grey-700 text-sm font-bold mb-2 mt-4" htmlFor="empresa"> Empresa </label>
                                <input 
                                className=" shadow appearance-none border rounded w-full py-2 px-2 text-gray-700" 
                                id="empresa"
                                type="text"
                                placeholder="Empresa Cliente "
                                value={ values.empresa }
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                                ></input>
                            </div>

                            {

                                errors.empresa && touched.empresa ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold"> Error </p>
                                        <p> { errors.empresa } </p> 
                                    </div>
                                ) : null 

                            }

                            <div>
                                <label className="block text-grey-700 text-sm font-bold mb-2 mt-4" htmlFor="telefono"> Telefono </label>
                                <input 
                                className=" shadow appearance-none border rounded w-full py-2 px-2 text-gray-700" 
                                id="telefono"
                                type="tel"
                                placeholder="Telefono Cliente "
                                value={ values.telefono }
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                                ></input>
                            </div>

                            {

                                errors.telefono && touched.telefono ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold"> Error </p>
                                        <p> { errors.telefono } </p> 
                                    </div>
                                ) : null 

                            }

                            <input 
                            type="submit" 
                            className="bg-gray-700 w-full text-white mt-5 p-2 uppercase hover:bg-gray-900 cursor-pointer block"
                            value="Registrar Cliente"
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

export default nuevocliente
