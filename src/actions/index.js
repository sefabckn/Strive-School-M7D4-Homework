export const REMOVE_FROM_FAV = 'REMOVE_FROM_FAV'
export const ADD_TO_FAV = 'ADD_TO_FAV'

export const addToFavAction = (addCompany) => ({
    type: ADD_TO_FAV,
    payload: addCompany, 
  })
  
  export const removeFromFavAction = (indexToRemove) => ({
    type: REMOVE_FROM_FAV,
    payload: indexToRemove,
  })