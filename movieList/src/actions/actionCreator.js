import axios from "axios";
import store from "../store";
import {
  ADD_BLOCK_LIST,
  ADD_LIKE_LIST,
  CHANGE_NAV_FLAG,
  CHANGE_PAGES,
  CHANGE_SORT_TYPE,
  CHANGE_TYPE_FLAG,
  FETCH_MOVIES_FAILURE,
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  SET_TOTAL_PAGES
} from './actionTypes'


export const fetchMoviesRequest = () => {
  return {
    type: FETCH_MOVIES_REQUEST
  }
};

export const fetchMoviesSuccess = (movies) => {
  return {
    type: FETCH_MOVIES_SUCCESS,
    payload: movies
  }
};

export const fetchMoviesFailure = (error) => {
  return {
    type: FETCH_MOVIES_FAILURE,
    payload: error
  }
};

export const changeTotalPages = (pages) => {
  return {
    type: SET_TOTAL_PAGES,
    payload: pages
  }
}

export const fetchMovies = () => {
  const basicURL = 'https://api.themoviedb.org/3/discover/movie?api_key=73c5ad84a6c042355108404f7b4d3633&language=en-US&sort_by=';
  const page = store.getState().page;
  const sort = store.getState().sort;
  let url = basicURL + sort + '&page=' + page;
  return function (dispatch) {
    dispatch(fetchMoviesRequest());
    axios.get(url)
      .then(response => {
        const results = response.data.results;
        const totalPages = response.total_pages;
        dispatch(changeTotalPages(totalPages));
        dispatch(fetchMoviesSuccess(results));
      })
      .catch(error => {
        dispatch(fetchMoviesFailure(error.message))
      })
  }
};

export const addLikeList = (item) => (dispatch, getState) => {
  let like = getState().liked;
  let block = getState().block;
  if (like.some(movie => movie.id === item.id)) {
    return;
  } else {
    if (block.some(movie => movie.id === item.id)) {
      block = block.filter(movie => movie.id !== item.id);
      dispatch({
        type: ADD_BLOCK_LIST,
        payload: block
      })
    }
    const newLike = [...like, item];
    dispatch({
      type: ADD_LIKE_LIST,
      payload: newLike
    });
  }
};

export const removeLikeList = (item) => (dispatch, getState) => {
  let like = getState().liked;
  like = like.filter(movie => movie.id !== item.id);
  dispatch({
    type: ADD_LIKE_LIST,
    payload: like
  });
};

export const addBlockList = (item) => (dispatch, getState) => {
  let like = getState().liked;
  let block = getState().block;
  if (block.some(movie => movie.id === item.id)) {
    return;
  } else {
    if (like.some(movie => movie.id === item.id)) {
      like = like.filter(movie => movie.id !== item.id);
      dispatch({
        type: ADD_LIKE_LIST,
        payload: like
      })
    }
    block = [...block, item];
    dispatch({
      type: ADD_BLOCK_LIST,
      payload: block
    })
  }
};

export const removeBlockList = (item) => (dispatch, getState) => {
  let block = getState().block;
  block = block.filter(movie => movie.id !== item.id);
  dispatch({
    type: ADD_BLOCK_LIST,
    payload: block
  });
};

export const increasePage = () => (dispatch, getState) => {
  let page = getState().page;
  dispatch({
    type: CHANGE_PAGES,
    payload: page + 1
  })

}

export const decreasePage = () => (dispatch, getState) => {
  let page = getState().page <= 1 ? 2 : getState().page;
  dispatch({
    type: CHANGE_PAGES,
    payload: page - 1
  })
}

export const changeNavFlag = () => (dispatch) => {
  let newFlag = !store.getState().showNav;
  dispatch({
    type: CHANGE_NAV_FLAG,
    payload: newFlag
  })
}

export const changeSortType = (type) => (dispatch, getState) => {
  const oldFlag = getState().typeFlag;
  let typeFlag = {
    original_title: false,
    release_date: false,
    vote_average: false,
    vote_count: false
  }
  typeFlag[type] = !oldFlag[type];
  const flag = typeFlag[type];
  let sortFlag = '';
  if (flag) {
    sortFlag = type + '.desc';
  } else {
    sortFlag = type + '.asc'
  }

  dispatch({
    type: CHANGE_TYPE_FLAG,
    payload: typeFlag
  })
  dispatch({
    type: CHANGE_SORT_TYPE,
    payload: sortFlag
  })
}
