import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select'
import { gql , useQuery as UseQuery } from '@apollo/client'
import PedidoContext from '../../context/pedidos/PedidoContext';

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


const AsignarCliente = () => {

    const [cliente, setcliente] = useState([]);

    //  Context de Pedidos -> Todo lo que se declare en el State se obtiene por esta via *
    const pedidocontext = useContext( PedidoContext );
    const { agregarCliente } = pedidocontext;

    const { data, loading } = UseQuery( OBTENER_CLIENTES )

    useEffect(() => {
        agregarCliente( cliente )
    }, [cliente])


    if(loading) return 'Loading';

    const { obtenerClientes } = data;

    const seleccionarCliente = ( clientes ) => {
        setcliente( clientes )
    }

    return (

        <div>
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold"> Asigna un cliente al Pedido </p>
            <Select
                className="mt-3"
                options={ obtenerClientes }
                isMulti={ true }
                onChange={ clientes => seleccionarCliente( clientes )}
                getOptionValue={ clientes  => clientes.id }
                getOptionLabel={ clientes => clientes.nombre }
                placeholder='Seleccione el Cliente'
                noOptionsMessage={() => 'No hay Resultados '}
            />
        </div>

    )
}

export default AsignarCliente
