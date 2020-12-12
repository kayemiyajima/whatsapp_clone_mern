import { FETCH_ROOMS, ADD_ROOM, SET_USER, PATCH_MSG } from './actionTypes';

export const initialState = {
    user: null,
};

const reducer = (state = [], action) => {
    console.log(action);
    switch (action.type) {           
        case FETCH_ROOMS:
            return action.payload;

        case ADD_ROOM:
            return [...state, action.payload]
  
        case SET_USER:
            return {
                ...state, //keep whatever already in there
                user: action.user, //and change only the user
            };

        case PATCH_MSG:
            return state.map((state) => state._id === action.payload._id ? action.payload : state);
            
        default:
            return state;
    }
};

export default reducer;