const initialState = {
  loading: false,
  movies: [],
  liked: [],
  block: [],
  showNav: false,
  error: '',
  page: 1,
  totalPage: 500,
  sort: 'popularity.desc',
  typeFlag:{
    original_title:false,
    release_date:false,
    vote_average:false,
    vote_count:false
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
    case "CHANGE_NAV_FLAG":
      return {
        ...state,
        showNav: action.payload
      }
    case "FETCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true
      }
    case "FETCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload,
        error: ''
      }
    case "FETCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        movies: [],
        error: action.payload
      }
    case "ADD_BLOCK_LIST":
      return {
        ...state,
        block: action.payload
      }
    case "ADD_LIKE_LIST":
      return {
        ...state,
        liked: action.payload
      }
    case "SET_MOVIES_STATE":
      return {
        ...state,
        movies: action.payload
      }
    case "CHANGE_PAGES":
      return {
        ...state,
        page: action.payload
      }
    case "CHANGE_SORT_TYPE":
      return  {
        ...state,
        sort: action.payload
      }
    case "CHANGE_TYPE_FLAG":
      return {
        ...state,
        typeFlag: action.payload
      }
  }
}

export default reducer