import React, { useReducer } from 'react'
import PedidoContext from './PedidoContext'
import {
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO,
    CANTIDAD_PRODUCTOS,
    ACTUALIZAR_TOTAL
} from '../../types/index'
import PedidoReducer from './PedidoReducer'

const PedidoState = ({ children }) => {

    const initialState = {
        cliente : [],
        producto : [],
        total : 0
    }

    const [state, dispatch] = useReducer(PedidoReducer, initialState )

    const agregarCliente = ( cliente ) => {
        dispatch({
            type: SELECCIONAR_CLIENTE,
            payload: cliente
        })
    }
    
    const agregarProducto = ( productoSeleccionado ) => {

        let nuevoState;

        if( state.producto.length > 0 ){

            nuevoState = productoSeleccionado.map( prod => {
                const newObject = state.producto.find( productoState => productoState.id === prod.id )
                return { ...prod, ...newObject }
            })

        }else{
            nuevoState = productoSeleccionado
        }

        dispatch({

            type:SELECCIONAR_PRODUCTO,
            payload : nuevoState

        })
    }

    const cantidadProductos =  (newCantidad)  => {
       dispatch({
           type: CANTIDAD_PRODUCTOS,
           payload: newCantidad
       })
    }

    const actualizarTotal = () =>{
        
        dispatch({
            type: ACTUALIZAR_TOTAL
        })
    }

    return (

        <PedidoContext.Provider
            value={{
                producto: state.producto,
                total: state.total,
                cliente : state.cliente,
                agregarCliente,
                agregarProducto,
                cantidadProductos,
                actualizarTotal
            }}
        >
            { children }
        </PedidoContext.Provider>
    )
}

export default PedidoState;