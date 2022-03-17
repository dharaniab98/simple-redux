const { createStore, combineReducers } = require("redux")


const BUY_APPLES = "BUY_APPLES"
const BUY_ORRANGES = "BUY_ORRANGES"

const buyOrranges = () => {
   return {
       type:BUY_ORRANGES
   }
}

const buyApples = () => {
   return {
       type:BUY_APPLES
   }
}
const initialAppleState = {
    numberOfApples: 100
}

const initialOrangeState = {
    numberOfOrranges: 200
}
const appleReducer = (state = initialAppleState, action) => {
    switch(action.type){
        case BUY_APPLES: 
            return {numberOfApples: state.numberOfApples - 1}
        default:
            return state
    
    }
}

const orrangeReducer = (state=initialOrangeState, action) => {
    switch(action.type){
        case BUY_ORRANGES:
            return { numberOfOrranges: state.numberOfOrranges - 1}
        default:
            return state
    }
}
const rootReducer = combineReducers({oranges:orrangeReducer, apples:appleReducer})
const store = createStore(rootReducer);
//console.log(store);
console.log(store.getState())
store.subscribe(() => {console.log(store.getState())})

store.dispatch(buyApples())
console.log(store.getState().oranges.numberOfOrranges)
store.dispatch(buyApples())
store.dispatch(buyApples())
store.dispatch(buyApples())
