export const REMOVE_FROM_FAV = 'REMOVE_FROM_FAV'
export const ADD_TO_FAV = 'ADD_TO_FAV'
export const TOGGLE_LOADER = 'TOOGLE_LOADER'
export const GET_JOBS = 'GET_JOBS'


export const addToFavAction = (addCompany) => ({
    type: ADD_TO_FAV,
    payload: addCompany, 
  })
  
  export const removeFromFavAction = (indexToRemove) => ({
    type: REMOVE_FROM_FAV,
    payload: indexToRemove,
  })
  /*
    useEffect(() => {
      getJobsAction();
  }, [query]);

  const [query, setQuery] = useState();
*/
  export const getJobsAction = () =>{
    
    return async(dispatch)=>{
      try {
        const response = await fetch(
          `https://strive-jobs-api.herokuapp.com/jobs?search=developer&limit=10`
        );
        if(response.ok){

          const {data} = await response.json()

          dispatch({
            type: GET_JOBS,
            payload : data,
          })

          setTimeout(() =>{
            dispatch({
              type: TOGGLE_LOADER,
              payload: false
            })
          },1000)

        } else {
            console.log('Error is fetching')
            dispatch({
              type: TOGGLE_LOADER,
              payload: false
            })
        }
      } catch (error) {
        console.log(error)
        dispatch({
          type: TOGGLE_LOADER,
          payload: false
        })
      }
    }


  }

