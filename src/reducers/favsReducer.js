import initialState from '../store'
import { ADD_TO_FAV, REMOVE_FROM_FAV } from '../actions'



const favsReducer = (state = initialState.favs, action)=>{
    switch(action.type){
        case ADD_TO_FAV:
      return {
        ...state,
        favs: {
          ...state.favs,
          // set prevents repetitions
          content: [...new Set([...state.favs.content, action.payload])],
        }
        }
        case REMOVE_FROM_FAV:
            return{
                ...state,
                favs: {
                    ...state.favs,
                    content: state.favs.content.filter(
                      (company, i) => i !== action.payload
                    ),
                  },
            }

        default:
            return state
    }
    
}

export default favsReducer