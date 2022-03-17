const {createStore, applyMiddleware} = require("redux");
const axios = require("axios");
const thunk = require("redux-thunk").default
const FETCH_REQUEST = "FETCH_REQUEST"
const UPDATE_DATA = "UPDATE_DATA"
const UPDATE_ERROR = "UPDATE_ERROR"

const initialState = {
    isLoading:true,
    users:[],
    isError:""
}

const fetchRequest = () => {
    return {
        type: FETCH_REQUEST
    }
}
const updateData = (payload) => {
    return { 
        type: UPDATE_DATA,
        payload: payload
    }
}

const updateError = (payload) => {
    return {
        type:UPDATE_ERROR,
        payload: payload
    }
}

const userReducer = (state=initialState, action) => {
    switch(action.type){
        case FETCH_REQUEST:
            return {...state, isLoading:false}
        case UPDATE_DATA: 
            return {...state,
                isLoading:false, 
                users: action.payload.users
            }
        case UPDATE_ERROR:
            return { isLoading:false, users:[], isError:action.payload.isError}
        default:
            return state
    }
}



let getUsers = () => {
    return function(dispatch){
        dispatch(fetchRequest())
        axios.get("https://jsonplaceholder.typicode.com/users").then((res) =>{
        dispatch(updateData({users:res.data.map(val => val.id)}))
        }).catch(err => dispatch(updateError({isError:err})))
    }
} 

const store = createStore(userReducer, applyMiddleware(thunk));
store.subscribe(() => {console.log(store.getState())})
store.dispatch(getUsers())