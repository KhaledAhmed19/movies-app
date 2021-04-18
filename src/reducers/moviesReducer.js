/* eslint-disable import/prefer-default-export */
export const currentReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_CURRENT":
      return action.payload;
    default:
      return state;
  }
};

export const selectedReducer = (state = null, action) => {
  switch (action.type) {
    case "SELECT_MOVIE":
      return action.payload;
    default:
      return state;
  }
};

export const modalReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_MODAL":
      return action.payload;
    default:
      return state;
  }
};
