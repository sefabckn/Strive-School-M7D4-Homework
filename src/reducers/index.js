import { ADD_TO_FAV, REMOVE_FROM_FAV } from "../actions";
import { initialState } from "../store";

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAV:
      return {
        ...state,
        favs: {
          ...state.favs,
          // set tekrarlamaları önler
          content: [...new Set([...state.favs.content, action.payload])],
          // bu da alternatif
         // content: state.favs.content.find((job) => job.id === action.job.id)
         //   ? state.favs.content
         //   : [...state.favs.content, action.job],
        },
      };
    case REMOVE_FROM_FAV:
      return {
        ...state,
        favs: {
          ...state.favs,
          content: state.favs.content.filter(
            (company, i) => i !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};

export default mainReducer;
