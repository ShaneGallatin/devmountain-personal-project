import {createStore, combineReducers, applyMiddleware} from "redux";
import promise from "redux-promise-middleware";
import authReducer from "./authReducer";
import albumReducer from "./albumReducer"

const root = combineReducers({
    authReducer,
    albumReducer
})

export default createStore(root, applyMiddleware(promise));