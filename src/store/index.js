import { createStore, compose, combineReducers, applyMiddleware, } from 'redux'
import thunk from 'redux-thunk'
import favsReducer from '../reducers/favs'
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
  favs: favsReducer,
  jobs: jobsReducer,
})

const configureStore = createStore(
  bigReducer,
  initialState,
   // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  aComposeThatAlwaysWorks(applyMiddleware(thunk))
)

export default configureStore