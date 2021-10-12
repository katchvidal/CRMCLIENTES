import React, { useState as UseState } from "react"
import Layout from "../components/Layout"
import Link from "next/link"
import { Formik } from "formik"
import * as Yup from 'yup'
import { gql, useMutation as UseMutation } from '@apollo/client'
import Swal from 'sweetalert2';
import router from "next/router"

const AUTENTICAR_USUARIO = gql`
    mutation autenticarUsuario($input : AutenticarInput) {
        autenticarUsuario(input : $input) {
            token
        }
    }
`;

const login = () => {

    const [autenticarUsuario] = UseMutation( AUTENTICAR_USUARIO )
    const [mensaje, saveMensaje ] = UseState( null )

    const ShowMessage = () => {
        mensaje;
    }

    return (
        <>
            <Layout>

                    { ShowMessage() }

                    <h1 className="text-center text-white text-4xl font-bold"> LOGIN </h1>
                    <div className=" flex justify-center mt-5">
                    <div className=" w-full max-w-md">

                    <Formik
                            initialValues={{ email: '', password: '' }}
                            validationSchema ={ 
                                Yup.object({
                                    email: Yup.string()
                                                        .required('El Email es Obligatorio').email('El email no es Valido'),
                                    password: Yup.string()
                                                        .required('El Password es Requerido')
                                                        .min(6, 'Minimo Seis Characteres ')
                                })
                            }
                            onSubmit={ async values  => {
                                const { email, password } = values
                                try {
                                    const { data } = await autenticarUsuario({
                                        variables : {
                                            input : {
                                                email,
                                                password
                                            }
                                        }
                                    })
                                    saveMensaje( 
                                        Swal.fire({
                                            position: 'top-end',
                                            icon: 'success',
                                            title: `Acceso Correcto ${ email }` ,
                                            showConfirmButton: false,
                                            timer: 2000
                                        }) 
                                    );
                                    const token = ( data.autenticarUsuario.token  );
                                    //console.log( token );
                                    localStorage.setItem('token', token )
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
                                <label className="block text-grey-700 text-sm font-bold mb-2 " htmlFor="email"> Email </label>
                                <input 
                                className=" shadow appearance-none border rounded w-full py-2 px-2 text-gray-700" 
                                id="email"
                                type="email"
                                placeholder="user@email.com"
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
                                <label className="block text-grey-700 text-sm font-bold mb-2 mt-4" htmlFor="password"> Password </label>
                                <input 
                                className=" shadow appearance-none border rounded w-full py-2 px-2 text-gray-700" 
                                id="password"
                                type="password"
                                placeholder="°°°°°°°°°"
                                value={ values.password }
                                onChange={ handleChange }
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
                            value="Iniciar Sesion"
                            ></input>
                            <Link href="/registros">
                            <a> No tienes Cuenta Registrate </a>
                            </Link>
                        </form>
                )}
                </Formik>
                
                    </div>

                    </div>
                
            </Layout> 
        </>
    )
}

export default login
