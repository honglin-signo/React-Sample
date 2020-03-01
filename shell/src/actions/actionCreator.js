import axios from "axios";
import store from "../store";
import {
  FETCH_IMAGES_FAILURE,
  FETCH_IMAGES_REQUEST,
  FETCH_IMAGES_SUCCESS
} from "./actionTypes";

export const fetchImagesRequest = () => {
  return {
    type: FETCH_IMAGES_REQUEST
  };
};

export const fetchImagesSuccess = movies => {
  return {
    type: FETCH_IMAGES_SUCCESS,
    payload: movies
  };
};

export const fetchImagesFailure = error => {
  return {
    type: FETCH_IMAGES_FAILURE,
    payload: error
  };
};

export const fetchImages = () => {
  const url = "https://picsum.photos/v2/list";
  return function(dispatch) {
    dispatch(fetchImagesRequest());
    axios
      .get(url)
      .then(response => {
        dispatch(fetchImagesSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchImagesFailure(error.message));
      });
  };
};
