import React, { useState as UseState } from 'react';
import { gql, useMutation as UseMutation } from '@apollo/client'
import { useRouter as UseRouter } from 'next/router';
import { Formik } from 'formik';
import Swal from 'sweetalert2';
import Link from "next/link"
import * as Yup from 'yup'
import Layout from "../components/Layout"


const NUEVA_CUENTA = gql `
    mutation nuevoUsuario($input: UsuarioInput) {
        nuevoUsuario(input: $input) {
            id
            nombre
            apellido
            email
            creado
        }
    }
`;



export const registros = () => {

    const [ nuevoUsuario ] = UseMutation( NUEVA_CUENTA )

    const [mensaje, saveMensaje ] = UseState( null )

    const ShowMessage = () => {
        mensaje;
    }

    const router = UseRouter()

    return (
        <div>
            <Layout>

                { ShowMessage() }

            <h1 className="text-center text-white text-4xl font-bold uppercase"> Crear Nueva Cuenta  </h1>
           <div className=" flex justify-center mt-5">
            <div className=" w-full max-w-md">
                <Formik
                    initialValues={{ email: '', password: '', nombre: '', apellido: '', password: '' }}
                    validationSchema ={ 
                        Yup.object({
                            nombre: Yup.string()
                                                .required('El Nombre es Obligatorio'),
                            apellido: Yup.string()
                                                .required('El Apellido es Obligatorio'),
                            email: Yup.string()
                                                .required('El Email es Obligatorio').email('El email no es Valido'),
                            password: Yup.string()
                                                .required('El Password es Requerido')
                                                .min(6, 'Minimo Seis Characteres ')
                        })
                    }
                    onSubmit={ async values  => {
                        const { nombre, apellido, email, password } = values
                        try {
                            const { data } = await nuevoUsuario({
                                variables :{
                                    input : {
                                        nombre,
                                        apellido,
                                        email,
                                        password
                                    }
                                }
                            });
                        saveMensaje( 
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: ` Usuario Creado : ${data.nuevoUsuario.nombre} ${data.nuevoUsuario.apellido} ` ,
                                showConfirmButton: false,
                                timer: 2000
                            }) 
                        )
                        setTimeout(() => {
                            saveMensaje( null )
                            router.push('/login')
                        }, 3000)
                        } catch (error) {
                            saveMensaje(

                                Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: error.message,
                                footer: 'Registre un Usuario Nuevo Porfavor'
                            }) 
                        )
                            setTimeout(() => {
                                saveMensaje(null)
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
                                <div className="mb-4">
                                    <label className="block text-grey-700 text-sm font-bold mb-2 " htmlFor="nombre"> Nombre </label>
                                    <input 
                                    className=" shadow appearance-none border rounded w-full py-2 px-2 text-gray-700" 
                                    id="nombre"
                                    type="nombre"
                                    placeholder="Nombre Usuario"
                                    onChange={ handleChange }
                                    value={ values.nombre }
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

                                <div className="mb-4">
                                    <label className="block text-grey-700 text-sm font-bold mb-2 " htmlFor="apellido"> Apellido </label>
                                    <input 
                                    className=" shadow appearance-none border rounded w-full py-2 px-2 text-gray-700" 
                                    id="apellido"
                                    type="apellido"
                                    placeholder="Apellido Usuario"
                                    onChange={ handleChange }
                                    value={ values.apellido }
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

                                <div className="mb-4">
                                    <label className="block text-grey-700 text-sm font-bold mb-2 " htmlFor="email"> Email </label>
                                    <input 
                                    className=" shadow appearance-none border rounded w-full py-2 px-2 text-gray-700" 
                                    id="email"
                                    type="email"
                                    placeholder="user@email.com"
                                    onChange={ handleChange }
                                    value={ values.email }
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

                                <div className="mb-4">
                                    <label className="block text-grey-700 text-sm font-bold mb-2 mt-4" htmlFor="password"> Password </label>
                                    <input 
                                    className=" shadow appearance-none border rounded w-full py-2 px-2 text-gray-700" 
                                    id="password"
                                    type="password"
                                    placeholder="°°°°°°°°°"
                                    onChange={ handleChange }
                                    value={ values.password }
                                    onBlur={ handleBlur }
                                    ></input>
                                </div>
                                {

                                    errors.password && touched.password ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold"> Error </p>
                                            <p> { errors.password } </p> 
                                        </div>
                                    ) : null 

                                }

                                <input 
                                type="submit" 
                                className="bg-gray-700 w-full text-white mt-5 p-2 uppercase hover:bg-gray-900 cursor-pointer block"
                                value="crear nueva cuenta"
                                ></input>
                                <Link href="/login">
                                <a> Ya tienes cuenta Ingresa!! </a>
                                </Link>
                            </form> 


                )}
                </Formik>
            </div>

           </div>
            </Layout>
        </div>
    )
}

export default registros
