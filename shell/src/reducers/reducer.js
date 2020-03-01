const initialState = {
  images:[]
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
    case "FETCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true
      }
    case "FETCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        images: action.payload,
        error: ''
      }
    case "FETCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        movies: [],
        error: action.payload
      }
  }
}

export default reducer