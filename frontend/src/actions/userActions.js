import axios from 'axios'
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
    PROFILE_REQUEST,
    PASSWORD_SUCCESS_REQUEST,
    PASSWORD_FAIL_REQUEST,
    PASSWORD_REQUEST,
    PROFILE_SUCCESS_REQUEST,
    PROFILE_FAIL_REQUEST,
    REQUEST_FORGOT_PASSWORD,
    SUCCESS_FORGOT_PASSWORD,
    FAIL_FORGOT_PASSWORD,
    REQUEST_NEW_PASSWORD,
    SUCCESS_NEW_PASSWORD,
    FAIL_NEW_PASSWORD,
    CLEAR_ERRORS
}from '../constants/userConstants'

export const login = (email, password)=> async(dispatch)=>{
    try{
        dispatch({type: REQUEST_LOGIN})
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }

        const { data} = await axios.post('/api/v1/login', {email,password}, config)
        dispatch({
            type:SUCCESS_LOGIN,
            payload: data.user
        })
    }
    catch(error){
        dispatch({
            type: FAIL_LOGIN,
            payload:error.response.data.message
        })
    }
}
export const register = (userData)=> async(dispatch)=>{
    try{
        dispatch({type: REQUEST_REGISTER})
        const config = {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data} = await axios.post('/api/v1/register', userData, config)
        dispatch({
            type:SUCCESS_REQUEST_REGISTER,
            payload: data.user
        })
    }
    catch(error){
        dispatch({
            type: FAIL_REQUEST_REGISTER,
            payload:error.response.data.message
        })
    }
}

export const load = ()=> async(dispatch)=>{
    try{
        dispatch({type: LOAD_REQUEST})

        const { data} = await axios.get('/api/v1/me')
        dispatch({
            type:SUCCESS_LOAD_REQUEST,
            payload: data.user
        })
    }
    catch(error){
        dispatch({
            type: FAIL_LOAD_REGISTER,
            payload:error.response.data.message
        })
    }
}
export const logout = ()=> async(dispatch)=>{
    try{

        await axios.get('/api/v1/logout')
        dispatch({
            type:SUCCESS_LOGOUT,
        })
    }
    catch(error){
        dispatch({
            type: FAIL_LOGOUT,
            payload:error.response.data.message
        })
    }
}
export const profileUpdate = (userData)=> async(dispatch)=>{
    try{
        dispatch({type: PROFILE_REQUEST})
        const config = {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data} = await axios.put('/api/v1/me/update', userData, config)
        dispatch({
            type:PROFILE_SUCCESS_REQUEST,
            payload: data.success
        })
    }
    catch(error){
        dispatch({
            type: PROFILE_FAIL_REQUEST,
            payload:error.response.data.message
        })
    }
}
export const passwordUpdate = (passwords)=> async(dispatch)=>{
    try{
        dispatch({type: PASSWORD_REQUEST})
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }

        const { data} = await axios.put('/api/v1/password/update', passwords, config)
        dispatch({
            type:PASSWORD_SUCCESS_REQUEST,
            payload: data.success
        })
    }
    catch(error){
        dispatch({
            type: PASSWORD_FAIL_REQUEST,
            payload:error.response.data.message
        })
    }
}
export const passwordForgot = (email)=> async(dispatch)=>{
    try{
        dispatch({type: REQUEST_FORGOT_PASSWORD})
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }

        const { data} = await axios.post('/api/v1/password/forgot', email, config)
        dispatch({
            type:SUCCESS_FORGOT_PASSWORD,
            payload: data.message
        })
    }
    catch(error){
        dispatch({
            type: FAIL_FORGOT_PASSWORD,
            payload:error.response.data.message
        })
    }
}
export const passwordNew = (token, passwords)=> async(dispatch)=>{
    try{
        dispatch({type: REQUEST_NEW_PASSWORD})
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }

        const { data} = await axios.put(`/api/v1/password/reset/${token}`, passwords, config)
        dispatch({
            type:SUCCESS_NEW_PASSWORD,
            payload: data.success
        })
    }
    catch(error){
        dispatch({
            type: FAIL_NEW_PASSWORD,
            payload:error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };
  
