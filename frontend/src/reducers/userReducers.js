import{
    REQUEST_LOGIN,
    FAIL_LOGIN,
    SUCCESS_LOGIN,
    REQUEST_REGISTER,
    SUCCESS_REQUEST_REGISTER,
    FAIL_REQUEST_REGISTER,
    LOAD_REQUEST,
    SUCCESS_LOAD_REQUEST,
    FAIL_LOAD_REGISTER,
    SUCCESS_LOGOUT,
    FAIL_LOGOUT,
    PASSWORD_REQUEST,
    PASSWORD_RESET,
    PROFILE_REQUEST,
    PROFILE_SUCCESS_REQUEST,
    PROFILE_FAIL_REQUEST,
    PROFILE_RESET,
    CLEAR_ERRORS,
    PASSWORD_SUCCESS_REQUEST,
    PASSWORD_FAIL_REQUEST,
    REQUEST_FORGOT_PASSWORD,
    SUCCESS_FORGOT_PASSWORD,
    FAIL_FORGOT_PASSWORD,
    REQUEST_NEW_PASSWORD,
    SUCCESS_NEW_PASSWORD,
    FAIL_NEW_PASSWORD
}from '../constants/userConstants'

export const authReducer = (state = {user:{}}, action)=>{
    switch(action.type){
        case REQUEST_LOGIN:
        case REQUEST_REGISTER:
        case LOAD_REQUEST:
            return{
                loading: true,
                isAuthdU: false,

            }
            case SUCCESS_LOGIN:
            case SUCCESS_REQUEST_REGISTER:
            case SUCCESS_LOAD_REQUEST:
                return{
                    ...state,
                    loading:false,
                    isAuthdU: true,
                    user: action.payload
                }

            case SUCCESS_LOGOUT:
                return{
                    loading:false,
                    isAuthdU: false,
                    user: null
                }

            case FAIL_LOAD_REGISTER:    
                return{
                    loading: false,
                    isAuthdU: false,
                    user: null,
                    error: action.payload
                }

            case FAIL_LOGOUT:
                return{
                    ...state,
                    error:action.payload
                }

            case FAIL_LOGIN:
            case FAIL_REQUEST_REGISTER:
                return{
                    ...state,
                    loading: false,
                    isAuthdU:false,
                    user: null,
                    error: action.payload
                }

            case CLEAR_ERRORS:
                return{
                    ...state,
                    error:null,
                    
                }

        default:
            return state
    }
}
export const userReducer = (state ={},action)=>{
    switch(action.type){
        case PROFILE_REQUEST:
        case PASSWORD_REQUEST:
            return{
                ...state,
                loading: true
            }
        case PROFILE_RESET:
        case PASSWORD_RESET:
            return{
                ...state,
                isUpdated: false
            }
        case PROFILE_SUCCESS_REQUEST:
        case PASSWORD_SUCCESS_REQUEST:
            return{
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case PROFILE_FAIL_REQUEST:
        case PASSWORD_FAIL_REQUEST:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
            case CLEAR_ERRORS:
                return{
                    ...state,
                    error:null,
                    
                }
        
        default:
            return state;
    }
}
export const passwordForgotReducer = (state ={},action)=>{
    switch(action.type){
        case REQUEST_FORGOT_PASSWORD:
        case REQUEST_NEW_PASSWORD:
            return{
                ...state,
                loading: true,
                error:null
            }
        case SUCCESS_FORGOT_PASSWORD:
            return{
                ...state,
                loading:false,
                message: action.payload
            }
        case SUCCESS_NEW_PASSWORD:
            return{
                ...state,
                success: action.payload
            }
        case FAIL_FORGOT_PASSWORD:
        case FAIL_NEW_PASSWORD:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
            case CLEAR_ERRORS:
                return{
                    ...state,
                    error:null,
                    
                }
        
        default:
            return state;
    }
}
