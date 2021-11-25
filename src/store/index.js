import { createStore, compose, combineReducers, } from 'redux'
import mainReducer from '../reducers'
import thunk from 'redux-thunk'
import favsReducers from '../reducers/favs'
import jobsReducer from '../reducers/jobs'

const aComposeThatAlwaysWorks = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const initialState = {
  
  favs: {
    content: [],
  },

  jobs:{
    result:[],
    isError:false,
    isLoading:true,
  }
}

const bigReducer = combineReducers({
  favs: favsReducers,
  jobs: jobsReducer
})

const configureStore = createStore(
  mainReducer,
  initialState,
  
)

export default configureStore