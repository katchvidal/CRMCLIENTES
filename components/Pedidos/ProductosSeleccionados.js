import React, { useContext, useEffect, useState } from 'react'
import PedidoContext from '../../context/pedidos/PedidoContext';


const ProductosSeleccionados = ({ producto }) => {

    const pedidocontext  = useContext(PedidoContext)
    const { cantidadProductos, actualizarTotal } = pedidocontext
    const [cantidad, setcantidad] = useState(0)

    const handleCantidad = ( e ) => {
        setcantidad(e.target.value)
    }

    useEffect(() => {
        ActualizarCantidad();
        actualizarTotal();
    }, [cantidad])

    const ActualizarCantidad = () => {
        const newCantidad = { ...producto, cantidad: Number( cantidad ) };
        cantidadProductos( newCantidad );
    }

    const { nombre, precio } = producto
    return (
        <div className="md:flex md:justify-between md:items-center mt-4">
            <div className="md:w-2/4 mb-2 md:mb-0">
                <p className="text-sm"> { nombre } </p>
                <p className="text-sm"> ${ precio } </p>
            </div>

            <input
            className="shadow apperance-non border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4"
            type="number"
            placeholder="cantidad"
            onChange={ handleCantidad }
            value={ cantidad }
            >

            </input>
        </div>
    )
}

export default ProductosSeleccionados
