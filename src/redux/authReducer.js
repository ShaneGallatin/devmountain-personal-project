import axios from "axios";

const initialState = {
    username: "",
    password: "",
    email: "",
    loading: false,
    user: {}
}

const UPDATE_STATE = "UPDATE_STATE";
const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = "LOGOUT_USER";

export const updateState = e => {
    return {
        type: UPDATE_STATE,
        payload: e
    };
};

export const loginUser = (username, password) => {
    return {
        type: LOGIN_USER,
        payload: axios.post("/auth/login", {
            username: username,
            password: password
        })
    };
};

export const logoutUser = () => {
    return {
        type: LOGOUT_USER,
        payload: axios.get("/auth/logout")
    };
};

export default function authReducer(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case UPDATE_STATE:
            return {...state, ...payload};
        case `${LOGIN_USER}_PENDING`:
            return {...state, loading: true};
        case `${LOGIN_USER}_FULFILLED`:
            return {...state, loading: false, user: payload.data};
        case `${LOGOUT_USER}_PENDING`:
            return {...state, loading: true};
        case `${LOGOUT_USER}_FULFILLED`:
            return {...state, loading: false, user: {}};
        default:
            return state;
    }
}