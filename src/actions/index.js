/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
import Axios from "axios";

export const fetchCurrent = () => async (dispatch) => {
  const response = await Axios.get(
    "https://api.themoviedb.org/3/discover/movie?api_key=28a7ec6eb0036a0d9a13ad525316f33b&primary_release_date.gte=2021-03-14&primary_release_date.lte=2021-04-14"
  );

  dispatch({
    type: "FETCH_CURRENT",
    payload: response.data.results.slice(0, 5),
  });
};

export const selectMovie = (movie) => {
  return (
    {
      type: "SELECT_MOVIE",
      payload: movie,
    },
    {
      type: "SET_MODAL",
      payload: true,
    }
  );
};

export const setModal = (isOpen) => {
  return {
    type: "SET_MODAL",
    payload: isOpen,
  };
};
