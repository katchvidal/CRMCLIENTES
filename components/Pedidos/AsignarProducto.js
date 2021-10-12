import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select'
import { gql, useQuery as UseQuery } from '@apollo/client'
import PedidoContext from '../../context/pedidos/PedidoContext';


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


const AsignarProducto = () => {

    const [producto, setproducto] = useState([])
    const pedidocontext  = useContext(PedidoContext)
    const { agregarProducto } = pedidocontext

    useEffect(() => {
        agregarProducto( producto )
    }, [producto])

    const { data, loading } = UseQuery(OBTENER_PRODUCTOS)
    if( loading ) return 'Loading...'
    const { obtenerProductos } = data 

    const SeleccionarProductos = ( productos ) => {
        setproducto( productos )
    }

    return (
        <div>
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold"> Asigna un Producto al Pedido </p>
            <Select
                className="mt-3"
                options={ obtenerProductos }
                isMulti={ true }
                onChange={ productos => SeleccionarProductos( productos )}
                getOptionValue={ productos  => productos.id }
                getOptionLabel={ productos => `${productos.nombre} - Disponibles: ${productos.existencia}` }
                placeholder='Seleccione el Producto que Desee '
                noOptionsMessage={() => 'No hay Resultados '}
            />
        </div>
    )
}

export default AsignarProducto
