import React, { useContext } from 'react'
import PedidoContext from '../../context/pedidos/PedidoContext';
import ProductosSeleccionados from './ProductosSeleccionados';

const ResumenPedido = () => {

    const pedidocontext  = useContext(PedidoContext)
    const { producto } = pedidocontext

    return (
        <>
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold"> Ajusta las Cantidades </p>

            {
                producto.length > 0 ? (
                    <>
                        { producto.map( producto => 
                                <ProductosSeleccionados
                                    key={ producto.id}
                                    producto={ producto }
                                ></ProductosSeleccionados>
                            )}
                    </>
                ) : (
                    <>
                        <p className="mt-5 text-sm"> No Has Selecccionado ningun producto </p>
                    </>
                )
            }
        </>
    )
}

export default ResumenPedido
