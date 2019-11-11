import axios from "axios";

const initialState = {
    loading: false,
    albums: []
}

const GET_ALL_ALBUMS = "GET_ALL_ALBUMS";

export const getAllAlbums = () => {
    return {
        type: GET_ALL_ALBUMS, 
        payload: axios.get("/api/albums")
    }
}

export default function albumReducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case `${GET_ALL_ALBUMS}_PENDING`:
            return {...state, loading: true};
        case `${GET_ALL_ALBUMS}_FULFILLED`:
            return {...state, loading: false, albums: payload.data};
        default: 
            return state;
    }
}