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
export const newOrderReducer = (state={},action)=>{
    switch(action.type){
        case ORDER_CREATE_REQUEST:
            return{
                ...state,
                loading: true
            }
        case ORDER_CREATE_SUCCESS:
            return{
                loading:false,
                order:action.payload
            }
        case ORDER_CREATE_FAIL:
            return{
                loading:false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
        default:
            return state;
    }
}

export const myOrdersReducer=(state = {orders:[]}, action)=>{
    switch(action.type){
        case MY_ORDERS_REQUEST:
            return{
                loading:true
            }
        case MY_ORDERS_SUCCESS:
            return{
                loading:false,
                orders:action.payload
            }
        case MY_ORDERS_FAIL:
            return{
                loading:false,
                error: action.payload
            }
            case CLEAR_ERRORS:
                return{
                    ...state,
                    error:null
                }
        default:
            return state;
    }
}

export const detailOrderReducer=(state = {order:{}}, action)=>{
    switch(action.type){
        case ORDER_DETAIL_REQUEST:
            return{
                loading:true
            }
        case ORDER_DETAIL_SUCCESS:
            return{
                loading:false,
                order:action.payload
            }
        case ORDER_DETAIL_FAIL:
            return{
                loading:false,
                error: action.payload
            }
            case CLEAR_ERRORS:
                return{
                    ...state,
                    error:null
                }
        default:
            return state;
    }
}
