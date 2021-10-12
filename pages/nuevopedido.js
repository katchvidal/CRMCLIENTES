import React, { useContext as UseContext } from 'react'
import Layout from '../components/Layout'
import AsignarCliente from '../components/Pedidos/AsignarCliente'
import AsignarProducto from '../components/Pedidos/AsignarProducto'
import ResumenPedido from '../components/Pedidos/ResumenPedido'
import Total from '../components/Pedidos/Total'
import PedidoContext from '../context/pedidos/PedidoContext'
import { gql, useMutation as UseMutation  } from '@apollo/client'

const NUEVO_PEDIDO = gql`
mutation nuevoPedido($input: PedidoInput){
    nuevoPedido(input: $input){
        id
        pedido {
            id
            cantidad
        }
        total
        vendedor
        cliente
        estado
    }
}
`


const nuevopedido = () => {

    const pedidocontext  = UseContext( PedidoContext )
    const { cliente, producto, total  } = pedidocontext


    const [ nuevoPedido ] = UseMutation( NUEVO_PEDIDO ) 


    const validPedido = () => {
       return !producto.every( prod => prod.cantidad > 0 ) || total === 0 || cliente.length === 0  ? " opacity-50 cursor-not-allowed" : '';
    }

    const handleNuevoPedido = async() => {
        //  Limpiar campos de  Produtos incesarios  
        const pedido = producto.map(( { existencia, precio, nombre, creado, __typename, ...producto } ) => producto )
        //  Limpiar campos de  Cliente incesarios  
        const clienteid = cliente.map(( { __typename, nombre, apellido, email, empresa, estado, telefono, vendedor,  ...cliente } ) => cliente )
        console.log( clienteid );

        try {
            const { data } = await nuevoPedido({
                variables : {
                    input:{
                        cliente: clienteid,
                        pedido,
                        total
                    }
                }
            })
            console.log( data );
        } catch (error) {
            console.log( error );
        }
    }

    return (

        <Layout>
        <h1 className="text-3xl text-gray-800 font-bold p-2"> Nuevo Pedido </h1>

        <AsignarCliente />
        <AsignarProducto />
        <ResumenPedido />
        <Total />

        <button
        type='button' 
        onClick={ handleNuevoPedido }
        className={`bg-gray-700 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validPedido()}`} > Registrar Pedido </button>

        </Layout>

    )
}

export default nuevopedido
