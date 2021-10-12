import React, { useContext } from 'react'
import PedidoContext from '../../context/pedidos/PedidoContext';


const Total = () => {
    const pedidocontext  = useContext(PedidoContext)
    const {  total } = pedidocontext

    return (
        <div className="flex items-center mt-5 justify-between bg-white border-solid border-2 border-gray-300 p-2 ">
           <h2 className="text-gray-800 text-xl"> Total a Pagar   </h2>
           <p className="text-gray-800 mt-0"> $ {total} </p>
        </div> 
    )
}

export default Total
