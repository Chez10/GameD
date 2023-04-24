import axios from 'axios'
import {
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    MY_ORDERS_REQUEST,
    ORDER_DETAIL_FAIL,
    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    CLEAR_ERRORS
} from'../constants/orderConstants'
export const createOrder = (order)=> async(dispatch,getState)=>{
    try{
        dispatch({type: ORDER_CREATE_REQUEST})
        const config={
            headers:{
                'Content-Type' : 'application/json'
            }
        }
        const {data} = await axios.post('/api/v1/order/new',order,config)
        dispatch({
            type:ORDER_CREATE_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:error.response.data.message
        })
    }
}

export const myOrders = () => async(dispatch)=>{
    try{
        dispatch({type: MY_ORDERS_REQUEST});
        const {data}= await axios.get('/api/v1/orders/me')
        dispatch({
            type: MY_ORDERS_SUCCESS,
            payload: data.orders
        })
    }catch(error){
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}
export const getOrderDetails = (id) => async(dispatch)=>{
    try{
        dispatch({type: ORDER_DETAIL_REQUEST});
        const {data}= await axios.get(`/api/v1/order/${id}`)
        dispatch({
            type: ORDER_DETAIL_SUCCESS,
            payload: data.order
        })
    }catch(error){
        dispatch({
            type: ORDER_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };
