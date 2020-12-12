import * as api from './axios';
import { FETCH_ROOMS, ADD_ROOM, PATCH_MSG } from './actionTypes';

export const getRooms = () => async (dispatch) => {
    try {
        const { data } = await api.fetchRooms();
        console.log(data)
        dispatch({ 
            type: FETCH_ROOMS, 
            payload: data
        });
    } catch (error) {
        console.log(error);
    }
}
export const createRoom = (newRoom) =>async (dispatch) => {
    try {
        const { data } = await api.addRoom(newRoom);
        dispatch({
            type: ADD_ROOM,
            payload: data
        })
    } catch (error) {
        console.log(error)
    }
}

export const addMessage = (messages) => async (dispatch) => {
    try {
        const { data } = await api.patchMessage(messages);
        dispatch({ 
            type: PATCH_MSG, 
            payload: data
        });

    } catch (error) {
        console.log(error);
    }
}


